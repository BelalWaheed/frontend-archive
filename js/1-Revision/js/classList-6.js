const bgDiv = document.querySelector(".bgDiv"),
    bgPrimary = document.querySelector(".bg-primary"),
    bgWarning = document.querySelector(".bg-warning"),
    bgDanger = document.querySelector(".bg-danger"),
    bgBlack = document.querySelector(".bg-black");

//Add
bgDiv.classList.add("text-center");
bgPrimary.addEventListener("click", () => {
    bgDiv.classList.add("bg-danger");
    bgDiv.classList.add("text-info");
});
//Remove
bgWarning.addEventListener("click", () => {
    bgDiv.classList.remove("bg-danger");
    bgDiv.classList.remove("text-info");
});
//Toggle
bgBlack.addEventListener("click", () => {
    bgDiv.classList.toggle("bg-danger");
});
//Replace
bgDanger.addEventListener("click", () => {
    bgDiv.classList.replace("bg-danger", "bg-primary");
});

//  ____________________
const btn = document.querySelectorAll(".seDev .btn"),
    seDev = document.querySelector(".seDev p");

btn.forEach((elem) => {
    console.log(seDev);

    elem.addEventListener("click", () => {
        seDev.style.backgroundColor = elem.innerHTML;
    });
});
