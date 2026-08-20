const div = document.querySelector(".hola"),
    btns = document.querySelectorAll(".btn");
btns.forEach((element) => {
    if (element.innerHTML == "Add") {
        element.addEventListener("click", () => {
            let newDiv = `
                <div>
                <h1>Hola</h1>
                </div>
                `;
            div.innerHTML = newDiv;
        });
    } else if (element.innerHTML == "Edit") {
        element.addEventListener("click", () => {
            let newDiv = `
                <div>
                <h1>Vola</h1>
                </div>
                `;
            div.innerHTML = newDiv;
        });
    } else {
        element.addEventListener("click", () => {
            div.innerHTML = "";
        });
    }
});

//__Spread operator
// ...Arr -> بتفك
let x = [10, 20, 30, 40],
    num = 50,
    newX = [...x, num]; // add num to the arr
console.log(newX);
//  __________
//  Destructor
let [a, b, c] = x;
console.log(a);

let belal = {
    name: "Belal Waheed",
    id: 202302696,
    phone: "01111",
};

let { name, id } = belal;
console.log(name, id); //  Belal Waheed 202302696

let { phone, ...t } = belal;
console.log(t); // t here is new object have the rest of the object
//  __________
// ||
let data = "",
    re = data || "No data found"; // if error occure or empty
console.log(re);

//  __________
let arr = [10, 20, 30, 10, 20, 30],
    newArr = [...new Set(arr)];
console.log(arr);
