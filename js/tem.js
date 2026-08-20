from = document.querySelector(".from");
to = document.querySelector(".to");
swap = document.querySelector(".swap");
la = document.querySelector(".label_from");

form_select = document.querySelectorAll(".form_select");

fetch("https://v6.exchangerate-api.com/v6/890fbf5231600f783b5a056b/latest/USD")
    .then((res) => res.json())
    .then((data) => {
        const curences = data.conversion_rates;
        Object.keys(curences).forEach((key) => {
            form_select[0].innerHTML += `<option value="${key}">${key}</option>`;
            form_select[1].innerHTML += `<option value="${key}">${key}</option>`;
            // console.log(curences[key]);
        });
    });
swap.addEventListener("click", () => {
    [from.value, to.value] = [to.value, from.value];
});
// https://flagsapi.com/BE/shiny/64.png
