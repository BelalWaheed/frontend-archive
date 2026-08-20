var bBtn = document.querySelectorAll(".btn");
var bInp = document.querySelector("input");

bBtn.forEach((elem, i) => {
  bBtn[i].addEventListener("click", (show) => {
    bInp.value += show.target.id;
    if (show.target.id == "del") {
      bInp.value = " ";
    }
  });
});
