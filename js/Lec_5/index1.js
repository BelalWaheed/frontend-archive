var h = document.querySelector("div h1");
console.log(h);
function incre(x) {
  if (h.innerHTML < 25) {
    h.innerHTML = +h.innerHTML + x;
    h.style.color = "black";
  }
}
function decre(x) {
  if (+h.innerHTML) {
    h.innerHTML = +h.innerHTML - x;
  }
  if (+h.innerHTML == 0) {
    h.style.color = "red";
  }
}
