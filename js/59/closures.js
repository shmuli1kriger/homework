function multiply(x, y) {
    return x*y;
}
console.log(multiply(3,5));
console.log(multiply(2,7));
console.log(multiply(8,4));

function getMultiplier() {
    return function(x, y) {
        return x * y;
    };
}
const multiplier = getMultiplier();
console.log(multiplier(3, 6));

function getSpecificMultiplier(x) {
    return function(y) {
        return x * y;
    };
}
const multiplyBySix = getSpecificMultiplier(6);
console.log(multiplyBySix(7));
