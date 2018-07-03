
function isNull_Undefined(obj) {
    return obj===null|| obj === undefined;
}

function isArray(obj){
    return !isNull_Undefined(obj)&&(typeof obj==='object')&&obj.constructor===Array;
}

function isString(str){
    return !isNull_Undefined(str)&&(typeof str==='string')&&str.constructor===String;
}

function isNumber(obj){
    return !isNull_Undefined(obj)&&(typeof obj==='number')&&obj.constructor===Number;
}

function isDate(obj){
    return !isNull_Undefined(obj)&&(typeof obj==='object')&&obj.constructor===Date;
}

function isFunction(obj){
    return !isNull_Undefined(obj)&&(typeof obj==='function')&&obj.constructor===Function;
}

function isObject(obj){
    return !isNull_Undefined(obj)&&(typeof obj==='object')&&obj.constructor===Object;
}

function isNotEmptyString(str){
    return isString(str) && str.length>0;
}

function isNotEmptyArray(obj){
    return isArray(obj) && obj.length>0;
}

export {
    isArray,
    isString,
    isNumber,
    isDate,
    isFunction,
    isObject,
    isNull_Undefined,
    isNotEmptyString,
    isNotEmptyArray,
}
