var inpD = document.querySelector("input");
var butoon = document.querySelectorAll(".btn");
var bEq = document.querySelector(".belEq");
var bdel = document.querySelector(".belDel");
var bremo = document.querySelector(".remo");
function cal() {
  var x = inpD.value.indexOf("*");
  var y = inpD.value.indexOf("/");
  if (x == 0 || y == 0) {
    inpD.value = "";
  }
  if (inpD.value != "") {
    inpD.value = eval(inpD.value);
  }
}
function remo() {
  inpD.value = inpD.value.slice(0, -1);
}
bremo.addEventListener("click", () => {
  remo();
});

bdel.addEventListener("click", () => {
  inpD.value = "";
});

bEq.addEventListener("click", () => {
  cal();
});

butoon.forEach((elem, i) => {
  elem.addEventListener("click", (show) => {
    inpD.value += show.target.innerHTML;
  });
});
