const dataTypes = [
    {
        name: 'Array',
        val: 'array',
    },
    {
        name: 'Object',
        val: 'object',
    },
    {
        name: 'String',
        val: 'string',
    },
    {
        name: 'Number',
        val: 'number',
    },
    {
        name: 'Boolean',
        val: 'boolean',
    },
]
const fieldValWIthSelectedVal = {
    array: [], //add chaild type string
    object: [{
        type: 'string',
        name: 'changename',
        required: false,
    }],
}

class SchemaBuilder {
    constructor(appendingElement) {
        this.appendingElement = appendingElement;
        this.schema = {};
    }
    appendSchema = (schemaData) => {
        this.schema = schemaData;
        this.render()
        this.initializeEvent()
    }

    deleteKeys(data) {
        // const newDataList = data.split('.');
        const newArr = this.schema.fields;
        const newDt = newArr.splice(parseInt(data), 1);
        this.schema = {
            ...this.schema,
            fields: newArr
        }
        // console.log('dkslddjsk', newDt)
        this.render()
        this.initializeEvent()
    }

    apppleselectHandle = (e) => {
        const val = e.target.value;
        const childId = e.target.getAttribute('child-id');
        const dtaId = e.target.getAttribute('data-id').replaceAll('][', '$').replaceAll('[', '$').replaceAll(']', '').split('$').map((item) =>  isNaN(item) ? item: parseInt(item))
        let ref = {};
        let type = val;
        let schema = ref;
        let ind = this.schema.fields.findIndex((item) => item.name === dtaId[0]);
        let newItm = this.schema.fields[ind];
        
        // console.log(newItm)
        console.log(dtaId)

        dtaId.forEach((item) => {
            console.log(newItm)
            console.log(item)
            // newItm = newItm[item];
            // console.log(newItm);
        })
        // dtaId.map((k, i, value) => {
        //     schema = (schema[k] = (i == value.length -1 ? {type}: {type}))
        // })
        if(childId === null) {
            //all theother things goes here
            console.log('e.......', dtaId, ref);
            
        } else {
            // that means array childTyepe need to be updated with those dropdown chage
            console.log('e.......', dtaId, val, childId);
        }
    }
    selectHandle = (e) => {
        const selectVal = e.target.value;
        const childDataId = e.target.getAttribute('child-id');
        const dataIdList = e.target.getAttribute('data-id').split('.').map((item) => isNaN(item) ? item: parseInt(item))
        const result = [...dataIdList].reverse().reduce((res, key) => ({[key]: res}), {});
        let val = this.schema;
        const schemaarr = [] 
        dataIdList.forEach((key) => {
            val = val[key]
            if(typeof key === 'number') {
                schemaarr.push(val.name)
                if(val.name === 'array') {
                    schemaarr.push(0)
                }
                
            } else {
                schemaarr.push(key)
            }
            console.log(val)
            console.log(schemaarr)
            console.log('..............')
        })
        if(childDataId) {
            //change the datatype of the array
            //chaneg the childType here
            console.log('this is child', schemaarr)
        } else {
            //change type here
            console.log('this is normal object', schemaarr)
        }
        
        

    }

    inputHandle(e) {
        console.log('e...........input', e.target.value);
    }

    deleteHandle(e) {
        console.log('eeee......delete', e.target)
    }

    addHandle(e) {
        console.log('eeee...........add', e.target)
    }

    initializeEvent() {
        let a = document.querySelectorAll('.input-holder');
        a.forEach((item => {
            const ii = item.querySelector('input')
            ii?.addEventListener('input', this.inputHandle)
            const optn = item.querySelector('select')
            optn?.addEventListener('input', this.selectHandle)
        }))
        let b = document.querySelectorAll('.delete-button');
        b.forEach((item) => {
            item.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.deleteKeys(id)
            })
        })
        let addBtns = document.querySelectorAll('.add-button');
        addBtns.forEach((item) => {
            item.addEventListener('click', this.addHandle)
        })
    }

    render() {
        const wrapperFunc = (parent, child, bottomButton) => {
            return `<section class="max-w-xl relative border px-1 py-px border-gray-700 my-1 rounded ">
                    ${parent}
                    <aside class="pl-4">
                        ${child}
                        ${bottomButton ? bottomButton : ''}
                    </aside>
                </section>
            `
        }
        const recArr = (arrItem, dataId, addedName) => {
            const mnmn = arrItem.map((item, index) => {
                const inputName = addedName ? `${addedName}[${item.name}]` : item.name;
                let newDataId = dataId ? `${dataId}.${index}` : index.toString();
                const elementsReturn = `
                <div class="input-holder w-full flex gap-2 border my-1 rounded max-w-xl p-1 items-center border-gray-700 relative">
                    <input 
                        class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 leading-tight focus:outline-none"
                        name="${inputName}"
                        id="${inputName}"
                    />
                    <select id="type" data-id="${newDataId}" class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 max-w-xs leading-tight focus:outline-none">
                        ${dataTypes.map((dataType) => {
                            return `
                                <option value="${dataType}" ${dataType.val === item.type && 'selected'}>${dataType.name}</option>
                            `
                        }).join('')}
                    </select>
                    <button data-id=${newDataId} class="delete-button absolute right-0 mr-2 rounded hover:bg-gray-700 py-1 px-2">&#10060;</button></div>
                </div> 
                `
                if(item.type === 'array') {
                    const arrayInputName = addedName ? `${addedName}[${item.name}][0]` : `${item.name}[0]`;
                    const checkDataType = item?.fields?.length === 0 ?  item.childType || "string": item?.childType;
                    const emptyArrayName = addedName ? `${addedName}[${item.name}][]` : `${item.name}[]`
                    const buttonItem = `
                        <button type="button" data-id=${newDataId} class="add-button px-2 py-1 border border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 rounded mb-1">
                        Add
                        </button>
                    `
                    const arrofStr = `
                        <div class="input-holder w-full flex gap-2 border my-1 rounded max-w-xl p-1 items-center border-gray-700 relative">
                            <p 
                                class="appearance-none block w-full  rounded py-3 px-4"
                            >
                               Array of ${checkDataType}
                            </p>
                            <input type="hidden" name="${emptyArrayName}" />
                            <select id="type" data-id="${newDataId}" child-id="datainsidearray"  class="appearance-none block w-full bg-gray-800 rounded py-3 px-4 max-w-xs leading-tight focus:outline-none">
                                ${dataTypes.map((dataType) => {
                                    return `
                                        <option value="${dataType.val}" ${dataType.val === checkDataType && 'selected'}>${dataType.name}</option>
                                    `
                                }).join('')}
                            </select>
                        </div> 
                        `
                    
                    const addNewBtnCheck = checkDataType === "object" ? buttonItem : "";
                    const extraDataId = item?.childType === 'object' ? `${newDataId}.fields` : newDataId
                    const arrAndObj = item?.fields.length === 0 ? arrofStr :  wrapperFunc(arrofStr, recArr(item.fields, extraDataId, arrayInputName), addNewBtnCheck);
                    return wrapperFunc(elementsReturn, arrAndObj);
                }
                if(item.type === 'object') {
                    
                    const buttonItem = `
                        <button data-id=${newDataId} type="button" class="add-button px-2 py-1 border border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 rounded mb-1">
                         Add
                        </button>
                    `
                    return wrapperFunc(elementsReturn, recArr(item.fields, `${newDataId}.fields`, inputName), buttonItem);
                    // this is object
                }
                return elementsReturn;
            }).join('')



            return mnmn;
        }
        this.appendingElement.innerHTML = `${recArr(this.schema.fields, "fields")} <button type="button" class="add-button px-3 py-2 border border-gray-700 text-blue-500 hover:text-blue-400 rounded">Add</button>`
    }
}
/**
 * this is cool
 */