var bDiv = document.querySelectorAll(".bola");
var bBtn = document.querySelectorAll(".main button");
bBtn.forEach((elem, i) => {
  bDiv.forEach((di, i2) => {
    bBtn[i].addEventListener("click", () => {
      di.style.display = "none";
      if (di.id == elem.innerHTML) {
        di.style.display = "block";
      }
    });
  });
});
