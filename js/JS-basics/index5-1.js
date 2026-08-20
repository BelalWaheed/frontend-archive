/*
1-for
2-while
3-do while
4-function
    function name(params) {
    code
}

*/

var bh = document.querySelector(".bo");
bh.style.color = "red";

function increment() {
  if (+bh.innerHTML < 10) {
    bh.innerHTML = +bh.innerHTML + 1;
    bh.style.color = "green";
  }
}
function decrement() {
  if (+bh.innerHTML) {
    bh.innerHTML = +bh.innerHTML - 1;
  }
  if (+bh.innerHTML == 0) {
    bh.style.color = "red";
  }
}
