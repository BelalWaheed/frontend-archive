let x = [10, 20, 30, 40, 50, 60],
  sum = 0,
  myH = document.querySelector("h1");

x.forEach((element, i) => {
  sum += element;
});

console.log(sum / x.length - 1); //median
console.log("sdf" - "oh");
check = prompt("hola");
console.log(check);
if (check == "") {
  myH.innerHTML = "Write";
}
