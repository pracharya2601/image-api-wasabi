const elmId = (id) => {
    return document.getElementById(id);
}

const adClass = (id, className) => {
    let a = document.getElementById(id);
    a.classList.add(className);
}
const removeClass = (id, className) => {
    let a = elmId(id);
    a.classList.remove(className);
}

const toggleClass = (id, className) => {
    let a = document.getElementById(id);
    if(a){
        a.classList.toggle(className);
    }
}
const setAttr = (id, attr, attrVal) => {
    const a = elmId(id);
    if(a) {
        a.setAttribute(attr, attrVal);
    }
}
const removeAttr = (id, attr) => {
    const a = elmId(id);
    if(a) {
        a.removeAttribute(attr);
    }
}
const addEvent = (id, evnt, todoFunc) => {
    const a = elmId(id);
    if(a) {
        a.addEventListener(evnt, todoFunc);
    }
}

const addText = (id, text) => {
    const a = elmId(id);
    if(a) {
        a.textContent = text;
    }
}
const passLengthCheck = (pass) => {
    if(pass.length < 7 || pass.length > 15){
        addText('pass_error', "Password length is invalid");
    } else {
        addText('pass_error', "");
    }
}

const validateEmail  = (email) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email) {
        return "Please enter email address.";
    }
    if(email.match(mailformat)) {
       return;
    } else {
        return "Email format does not match.";
    }
}