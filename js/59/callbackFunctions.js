function everyFunction(array, callback) {
 for (let i=0; i< array.length; i++) {
    if (!callback(array[i])) {
        return false;
    }
 }
 return true;
}
function isUpperCase(x) {
    return(x === x.toUpperCase());
}
const letterArray = ['a', 'B', 'c'];
console.log(everyFunction(letterArray, isUpperCase));
function isLowerCase(x) {
    return(x === x.toLowerCase());
}
const letterArray2 = ['a', 'b', 'c'];
console.log(everyFunction(letterArray2, isLowerCase));
console.log(letterArray.every(isUpperCase));
console.log(letterArray2.every(isLowerCase));

function someFunction(array, callback) {
 for (let i=0; i< array.length; i++) {
    if (callback(array[i])) {
        return true;
    }
 }
 return false;
}
console.log(someFunction(letterArray, isUpperCase));
console.log(someFunction(letterArray2, isLowerCase));
console.log(letterArray.some(isUpperCase));
console.log(letterArray2.some(isLowerCase));