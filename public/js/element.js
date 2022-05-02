const createForm = ({label, dataId, ...props}) => {
    let newProps = '';
    Object.keys(props).map((item) => {
        newProps = newProps + `${item}="${props[item]}" `
    }) 
    return `
        <div class="px-3 w-full">
            ${label && `<label 
                class="block uppercase tracking-wide text-xs font-bold mb-2" 
                htmlFor=${props?.id}
            >${label}</label>`}
            <input 
                ${dataId && `data-id=${dataId}`}
                class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                ${newProps}
            />
            <p class="text-red-500 text-xs italic" id= ${props?.id + "_error"} ></p>
        </div>
    `
}

const createElement = (element, innerHtml, props) => {
    let newProps = '';
    Object.keys(props).map((item) => {
        newProps = newProps + `${item}="${props[item]}" `
    }) 
    return `
        <${element} ${newProps}>
            ${innerHtml}
        </${element}>
    `
}

class FormBuilder {
    constructor(formData) {
        this.formData = formData;
        this.elements = "";
    }

    appendData(data) {
        this.formData = data;
        this.initializeFunc();
    }

    onDeleteHandle(id) {
        // console.log('clicked')
        const splitted = id.split('.');
        const last = splitted.pop();
        let a = splitted.reduce((o,i)=> o[i], this.formData)
        _.pullAt(a, last)
        let newValue = splitted.reverse().reduce((res, key) => ({[key] : res}), a);
        _.merge(this.formData, newValue);
        this.initializeFunc();
        //return this.elements
    }

    addHandle(id) {
        const splitted = id.split('.');
        const a = {
            name: '',
            _id: '',
        }
        let m = [...splitted.reduce((o,i)=> o[i], this.formData), a]
        let newValue = splitted.reverse().reduce((res, key) => ({[key] : res}), m)
        _.merge(this.formData, newValue);
        this.initializeFunc();
    }

    initializeFunc() {
        let elmn = "";
        function renderArrayData(arrData, addedKey, dataId, showLabel) {
            arrData.forEach((itemData, index) => {
                const newKey = `${addedKey}.${index}`;
                let newDataId;
                if(typeof itemData === "object" && Array.isArray(itemData)) {
                    newDataId = `${dataId}.arr`
                } else if(typeof itemData === "object") {
                    newDataId = `${dataId}.obj`
                } else {
                    newDataId = `${dataId}.str`
                }
                const newLabel = addedKey.split('.');
                elmn = elmn + `<div
                    class="border border-gray-700 relative mt-1 -mx-2"
                    id=${newKey}
                    ${dataId && `data-id=${dataId}`}
                >

                    <button data-id=${newKey} type="button" class="delete-button absolute top-0 right-0 mt-px mr-2 border border-gray-700 px-2 text-sm text-red-500 hover:text-red-600">
                    Delete
                </button>
                <label 
                    class="block uppercase tracking-wide text-sm mb-2 p-2"
                >
                    ${newLabel[newLabel.length - 1]}-${index + 1}
                </label>
                `
                updateElements(itemData, newKey, newDataId, showLabel)
                elmn = elmn + `</div>`
            })
        }
        function updateElements(objData, addedKey, dataId, showLabel) {
            Object.keys(objData).map((key) => {
                if(objData.hasOwnProperty(key)) {
                    const data = objData[key];
                    const newKey = addedKey ? `${addedKey}.${key}` : key;
                    if(typeof data === "object")  {
                        if(Array.isArray(data)) {
                            let newDataId = dataId ? `${dataId}.arr` : 'arr';
                            renderArrayData(data, newKey, newDataId, false)
                            elmn = elmn + `
                            <div class="mt-1 ml-auto text-sm w-full p-2">
                                <button data-id=${newKey}  type="button" class="add-button border px-2 py-1 border-gray-700 text-indigo-500 hover:text-indigo-400">Add ${data && data.length > 0 ? 'More' : ''} ${key}</button>
                            </div>
                            `
                        } else {
                            let newDataId = dataId ? `${dataId}.obj` : 'obj';
                            elmn = elmn + `<div
                                class="border border-gray-700 relative mt-1 -mx-2"
                            >
                            <label 
                                class="block uppercase tracking-wide text-sm mb-2 p-2"
                            >
                                ${key}
                            </label>
                            `
                            updateElements(data, newKey, newDataId, true)
                            elmn = elmn + `</div>`
                        }

                    }
                    else if(key.includes("_")) {
                        elmn = elmn + `<input type="hidden" id=${newKey} name=${addedKey ? addedKey : key} value=${data} />`
                    } 
                    else {

                       let elment = createForm({
                            label: showLabel ? key : '',
                            id: newKey,
                            value: data,
                            name: addedKey ? addedKey : key,
                            type: typeof data === "number" ? "number" : "text",
                            dataId: dataId ?`${dataId}.str` : 'str',
                        })
                        elmn = elmn + elment
                    }

                }
            });
        }
        updateElements(this.formData, "", "obj", true)
        this.elements = elmn
    }
    updateChangeHandle(data) {
        this.formData = data;
    }
    updateChange(e) {
        const id = e.target.id;
        let allId = id.split('.')
        const value = allId.reverse().reduce((res, key) => ({[key] : res}), e.target.value);
        const merged = _.merge(this.formData, value);
        this.updateChangeHandle(merged)
    }

    handleSubmit() {
        console.log('submittedData', this.formData)
    }
}