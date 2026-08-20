const myH1 = document.querySelector("h1");

function increment() {
    myH1.innerHTML = +myH1.innerHTML + 1;
}
function decrement() {
    if (+myH1.innerHTML > 0) myH1.innerHTML = +myH1.innerHTML - 1;
}
console.log("12");
