const myBtn = document.querySelector(".btn");
myBtn.addEventListener("click", () => {
    const myh = document.querySelector("h1");
    myh.innerHTML = +myh.innerHTML + 1;
});
