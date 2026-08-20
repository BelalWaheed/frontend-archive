// 1-trim
let Belal = "      Hola  fasfo        ",
    belalV2 = Belal.trim();
// console.log(Belal.trim());

// 2-charAt
// console.log(belalV2.charAt(3)); //  a

// 3-index of
// console.log(belalV2.indexOf("a")); //  3

// 4-includes
// console.log(belalV2.includes("o")); // true

// 5-slice
let arr = "Belal Waheed Sadesk";
let Waheed = arr.indexOf("Waheed");
console.log(arr.slice(Waheed, Waheed + 6));

// 6-padStart
let a = "1",
    b = "12",
    c = "05";
console.log(a.padStart(3, "0")); //001
console.log(b.padStart(3, "0")); //012
console.log(c.padEnd(3, "4")); //054
