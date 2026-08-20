var bBtn = document.querySelectorAll(".btn");
var belDiv = document.querySelector(".main");
bBtn.forEach((element, i) => {
  bBtn[i].addEventListener("click", (show) => {
    belDiv.style.backgroundColor = element.innerHTML;
  });
});
