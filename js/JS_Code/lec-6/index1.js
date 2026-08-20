var bBtn = document.querySelectorAll(".btn");
var bH1 = document.querySelector("h1");
bBtn.forEach((elem, i) => {
    if (elem.innerHTML == "increment") {
        bBtn[i].addEventListener("click", () => {
            if (+bH1.innerHTML < 10) {
                bH1.innerHTML = +bH1.innerHTML + 1;
                bH1.style.color = "green";
            }
        });
    }
    if (elem.innerHTML == "decrement") {
        bBtn[i].addEventListener("click", () => {
            if (+bH1.innerHTML) {
                bH1.innerHTML = +bH1.innerHTML - 1;
            }
            if (!+bH1.innerHTML) {
                bH1.style.color = "red";
            }
        });
    }
});
