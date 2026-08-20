/*
    some  true or false
    every   //     // 
    map creat a new array with the same length
    filter creat a new array with the first true value
    find return the first true value 
    reduce return the last value and take the first and the secouond index 
*/

let arr = [10, 20, 30, 40];
let re = arr.some((num) => {
    return num > 20; //  true just for one
});
console.log(re);

//___________

let re2 = arr.every((num) => {
    return num > 20; // must be true for all the elements
});
console.log(re2);

//___________

let re3 = arr.map((num) => {
    return num > 20;
});
console.log(re3);
let re32 = arr.map((num) => {
    return num * 11;
});
console.log(re32);
//___________

let re4 = arr.filter((num) => {
    return num > 20;
});
console.log(re4);
//___________

let re5 = arr.find((num) => {
    return num > 20;
});
console.log(re5);

//___________
let re6 = arr.reduce((num1, num2) => {
    return num1 > num2 ? "ok" : "no";
});
console.log(re6);
