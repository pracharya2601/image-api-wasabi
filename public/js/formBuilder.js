
//schema type
let schemaTypes = [
    "key-value",
    "object",
    "array",
]

//html type
let htmltypes = [
    "text",
    "checkbox",
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "radio",
    "tel",
    "time",
    "url",
    "week",
];

// this is the childtype for array
let arrforArrayType = [...htmltypes, 'object', "array"];

const optionsRender = (options, selectName) => {
    //selectName is childType or htmlType
    return `
        <div class="px-3 w-full mb-1">
        <label class="block uppercase tracking-wide text-xs font-bold mb-2">${selectName}</label>
        <div class="relative z-1 mb-3">
        <select
            name="${selectName}"
            id="${selectName}"
            class="block appearance-none w-full bg-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
        >
            ${options.map((item) => {
                return `<option class="capitalize" value=${item}>${item}</option>`
            }).join('')}
        </select>
        </div>
        </div>
    `
}

const dialogFormRender = (schemType) => {
    //if object only render fieldName
    return `
        ${schemType === "key-value" ? optionsRender(htmltypes, "htmlType")
            : schemType === "array" ? optionsRender(arrforArrayType, 'childType')
            :""    
        }
        <div class="px-3 w-full">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="fieldName">field name</label>
            <input  class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="fieldName" id="fieldName" type="text">
        </div>
        ${ schemType != "object" ? `<div class="px-3 w-full flex justify-left item-center gap-2 mb-3">
            <input type="checkbox" id="required" name="required" class="mr-2 leading-tight form-checkbox h-5 w-5">
            <label for="required">* Required</label><br>
        </div>
        <div class="px-3 w-full">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="min">min</label>
            <input  class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="min" id="min" type="number">
        </div>
        <div class="px-3 w-full">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="max">max</label>
            <input  class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" name="max" id="max" type="number">
        </div>`: ""}
    `
}
const fieldFormRender = (id, name) => {
    return `
        <div class="px-3 w-full mb-1">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="${id}">Field Name</label>
            <input id="${id}" name="${name}" class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" />
        </div>
    `
}

const buttonRender = (id) => {
    return `
        <button type="button" onclick="openSchemaModal(this)" data-id="${id ? id: ''}" id="create-schema" class="px-3 py-1 border mt-1 border-gray-700 rounded hover:text-blue-500">
            Add Field
        </button>
        <div class="relative">
            <div class="origin-top-left absolute left-0 mt-px w-36 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none bg-gray-700 hidden" id="${id ? `schema-option-dropdown-${id}`:'schema-option-dropdown'}" role="menu" aria-orientation="vertical">
                <button type="button" onclick="openModelSchema(this)" class="block w-full px-4 py-2 text-sm hover:bg-gray-800" role="menuitem" tabindex="-1" id="key-value">Key Value</button>
                <button type="button" onclick="openModelSchema(this)" class="block w-full px-4 py-2 text-sm hover:bg-gray-800" role="menuitem" tabindex="-1" id="object">Object</button>
                <button type="button" onclick="openModelSchema(this)" class="block w-full px-4 py-2 text-sm hover:bg-gray-800" role="menuitem" tabindex="-1" id="array">Array</button>
            </div>
        </div>
    `
}

const keyValueRender = (fieldName, id, data, child, isChild, schemaType) => {
    if(fieldName.split('.').length > 1) {
       fieldName = `${fieldName.split('.')[0]}[0]`
    }
    return `
    <div class="appearance-none w-full max-w-md bg-gray-800 rounded ${isChild ? 'pl-4 -mr-4 py-1' : "px-4 mb-1 py-3"} leading-tight focus:outline-none">
        <div class="flex justify-between">
            <span>${fieldName}</span>
            ${ !isChild ? `<button class="rounded px-1 border py-px border-gray-700 hover:border-red-500" onclick="deleteFunctionSchema(this)" type="button" data-id="${id}">&#10060;</button>`: ''}
        </div>
        ${schemaType === "object" ? "": `
            <div class="flex flex-col mt-2 text-xs border rounded border-gray-700 p-1 -mx-1">
                ${data?.childType ? `<span>Array of ${data?.childType}</span>`: ""}
                ${data?.htmlType && !child ? `<span>Input Type: ${data?.htmlType}</span>` : ''}
                ${data?.childType && child ? `<span> Child Type: ${data?.childType}</span>` : ''}
                ${!data ? `${
                    data.min === 0 && data.max === 0 ? "": 
                    data.min > 0 && data.max > 0 ? 
                    `
                        <span>Min: ${data.min}</span>
                        <span>Max: ${data.max}</span>
                    `:
                    data.min > 0 ? `<span>Min: ${data.min}</span>` :
                    data.max > 0 ? `<span>Max: ${data.min}</span>`:
                    ""
                }`: ""}
                ${data.required === undefined ? "" : `<span>Required: ${data?.required?.toString()}</span>`}
            </div>
        `}
        ${child ? child : ''}
    </div>
`
}

/**
 * @fieldName - name of the field
 * @property - {schemaType, required, min, max, htmlType} // for object only schemaType
 * @meta - {isChild: boolean, objectNode: "" || some value with . notaion}
 */


//const joinedElement = (fieldName, {schemaType, ...data}, isChild) => {
const joinedElement = (fieldName, {schemaType, ...data}, {isChild, objectNode}) => {
    //data is the other object includes 
    let id = `${fieldName}`
    const validateSchemaType = schemaTypes.indexOf(schemaType);
    //on object sometimes there is only schemaType data might be null
    if(validateSchemaType < 0) {
        return;
    }
    if(schemaType === 'array') {
        // for array there is childType
        //return render elements
        const newObjectNode = objectNode ? `${objectNode}.${id}` : id;
        if(data.childType === 'object') {
            const {schemaType: schemaTypeArr, ...other} = data.child;
            //let childElement = Object.keys(other).map(key => joinedElement(key, other[key], true)).join('') + buttonRender(`${id}.child`);
            let childElement = Object.keys(other).map(key => joinedElement(key, other[key], {isChild: true, objectNode: newObjectNode})).join('') + buttonRender(`${newObjectNode}.child`);
            return keyValueRender(fieldName, id, data, childElement, isChild, "array");
        } else if(data.childType === 'array') {
            //let childElement = data.child ? joinedElement(`${fieldName}.child`, data.child, true) : buttonRender(`${id}.child`);
            let childElement = data.child ? joinedElement(`${fieldName}.child`, data.child, {isChild: true, objectNode: ''}) : buttonRender(`${id}.child`);
            return keyValueRender(fieldName, id, data, childElement, isChild, "array");
        } else {
            return keyValueRender(fieldName, id, data, "", isChild);
        }
    } else if (schemaType === 'object') {
        console.log(Object.keys(data));
        const newId = objectNode ? `${objectNode}.${id}`: id;
        //let childElements = Object.keys(data).map(key => joinedElement(key, data[key], true)).join('') + buttonRender(id);
        let childElements = Object.keys(data).map(key => joinedElement(key, data[key], {isChild: true, objectNode: newId})).join('') + buttonRender(newId);
        return keyValueRender(fieldName, id, data, childElements, isChild, "object");
    } else {
        // render elements
        return keyValueRender(fieldName, id, data, "", isChild);
    }
}

class FormSchema {
    constructor(appendingElement, form) {
        this.appendingElement = appendingElement;
        this.form = form ? form : {
            schemaType: 'object'
        };
        this.innerHTMLElements = '';
        this.schemaTypes = [
            "key-value",
            "object",
            "array",
        ]
    }

    renderForm() {
        this.renderHelper(this.form);
        this.appendingElement.innerHTML = this.innerHTMLElements;
    }

    deleteForm(id) {
        this.form = _.omit(this.form, [`${id}`])
    }

    setValue({fieldName, ...data}, objectNode) {
        console.log(`${objectNode}.${fieldName}`, data);
        let newItem = this.form;
        if(objectNode === "") {
            _.update(newItem, fieldName, () => {
                return data
            })
        } else {
            _.update(newItem, `${objectNode}.${fieldName}`, () => {
                return data;
            });
        }
        this.renderForm();
    }

    generateElements(fieldName, {schemaType, ...data}, {isChild, objectNode}) {
        let id = `${fieldName}`;
        const validateSchemaType = this.schemaTypes.indexOf(schemaType);
        if(validateSchemaType < 0) {
            return;
        }
        if(schemaType === 'array') {
            const newObjectNode = objectNode ? `${objectNode}.${id}` : id;
            if(data.childType === 'object') {
                const {schemaType: schemaTypeArr, ...other} = data.child;
                let childElement = Object.keys(other).map(key => joinedElement(key, other[key], {isChild: true, objectNode: newObjectNode})).join('') + buttonRender(`${newObjectNode}.child`);
                return keyValueRender(fieldName, id, data, childElement, isChild, "array");
            } else if(data.childType === 'array') {
                let childElement = data.child ? joinedElement(`${fieldName}.child`, data.child, {isChild: true, objectNode: ''}) : buttonRender(`${id}.child`);
                return keyValueRender(fieldName, id, data, childElement, isChild, "array");
            } else {
                return keyValueRender(fieldName, id, data, "", isChild);
            }
        } else if (schemaType === 'object') {
            const newId = objectNode ? `${objectNode}.${id}`: id;
            let childElements = Object.keys(data).map(key => joinedElement(key, data[key], {isChild: true, objectNode: newId})).join('') + buttonRender(newId);
            return keyValueRender(fieldName, id, data, childElements, isChild, "object");
        } else {
            return keyValueRender(fieldName, id, data, "", isChild);
        }
    }

    renderHelper({schemaType, ...data}) {
        // this case data is the main object and it shoud be type object
        //this is the root object
        if(Object.keys(data).length === 0) {
            // not form available need to show
            //this.innerHTMLElements = buttonRender('')
        } else {
            //let elements = Object.keys(data).map(key => joinedElement(key, data[key], false)).join('');
            let elements = Object.keys(data).map(key => this.generateElements(key, data[key], {isChild: false, objectNode: ''})).join('');
            this.innerHTMLElements = elements;
        }
    }

}