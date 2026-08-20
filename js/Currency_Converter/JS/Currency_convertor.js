const from = document.querySelector(".from");
const to = document.querySelector(".to");
const swap = document.querySelector(".swap");
const form_select = document.querySelectorAll(".form_select");
const laFromImg = document.querySelector(".label_from img");
const laToImg = document.querySelector(".label_to img");
const belInpuit = document.querySelector(".belInpuit");
const resultDiv = document.querySelector(".result h2");
const convertBtn = document.querySelector(".convertBtn");
const APIKey = "5848963f49c0231ca45d05b4";
let base = "USD";
let rates = {}; // object to store the Abbreviation of the curences
let fullNames = {}; // object to store the fullName of the curences

function updateFlags() {
    laFromImg.src = `
    https://flagsapi.com/${from.value.slice(0, 2)}/shiny/64.png`;
    laToImg.src = `https://flagsapi.com/${to.value.slice(0, 2)}/shiny/64.png`;
}

function calRates(base) {
    fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${base}`)
        .then((res) => res.json())
        .then((data) => {
            rates = data.conversion_rates;
            base = from.value;
        });
}

fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${base}`)
    .then((res) => res.json())
    .then((data) => {
        rates = data.conversion_rates;

        fetch("/data.json")
            .then((secRes) => {
                return secRes.json();
            })
            .then((secData) => {
                fullNames = secData;

                Object.keys(rates).forEach((key, i) => {
                    let keyFullName = fullNames[key];
                    form_select[0].innerHTML += `<option value="${key}">${key}  - ${keyFullName}</option>`;
                    form_select[1].innerHTML += `<option value=${key}>${key}  - ${keyFullName}</option>`;
                });
                to.value = "EGP";
                from.value = "USD";
                updateFlags();
            });
    });

swap.addEventListener("click", () => {
    let temp = from.value;
    from.value = to.value;
    to.value = temp;
    updateFlags();
});

from.addEventListener("click", () => {
    updateFlags();
});
to.addEventListener("click", () => {
    updateFlags();
});

convertBtn.addEventListener("click", () => {
    fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${from.value}`)
        .then((res) => res.json())
        .then((data) => {
            rates = data.conversion_rates;

            let amount = +belInpuit.value;
            let fromCurrency = from.value;
            let toCurrency = to.value;
            if (amount == "") {
                amount = "1";
            } else if (isNaN(amount) || amount <= 0) {
                resultDiv.innerHTML = `<h1 class="text-black">Please enter a valid positive number</h1>`;
                return;
            }

            let convertedAmount = amount * rates[toCurrency];
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        });
});
