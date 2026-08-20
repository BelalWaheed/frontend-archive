const from = document.querySelector(".from");
const to = document.querySelector(".to");
const swap = document.querySelector(".swap");
const laFromImg = document.querySelector(".label_from img");
const laToImg = document.querySelector(".label_to img");
const belInpuit = document.querySelector(".belInpuit");
const resultDiv = document.querySelector(".result h4");
const convertBtn = document.querySelector(".convertBtn");
const APIKey = "5848963f49c0231ca45d05b4";
let base = "USD";
let rates = {};
let fullNames = {};

function getCountryCode(currencyCode) {
    const customMap = {
        EUR: "EU",
        USD: "US",
        GBP: "GB",
        EGP: "EG",
        SAR: "SA",
        AED: "AE",
        KWD: "KW",
        JPY: "JP",
        CAD: "CA",
        AUD: "AU",
        CHF: "CH",
        CNY: "CN",
        INR: "IN",
        BRL: "BR",
        RUB: "RU",
        TRY: "TR"
    };
    return customMap[currencyCode] || currencyCode.slice(0, 2);
}

function updateFlags() {
    if (from.value) {
        laFromImg.src = `https://flagsapi.com/${getCountryCode(from.value)}/shiny/64.png`;
    }
    if (to.value) {
        laToImg.src = `https://flagsapi.com/${getCountryCode(to.value)}/shiny/64.png`;
    }
}

fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${base}`)
    .then((res) => res.json())
    .then((data) => {
        rates = data.conversion_rates;

        fetch("./data.json")
            .then((secRes) => secRes.json())
            .then((secData) => {
                fullNames = secData;

                from.innerHTML = "";
                to.innerHTML = "";

                Object.keys(rates).forEach((key) => {
                    const keyFullName = fullNames[key] || key;
                    from.innerHTML += `<option value="${key}">${key} — ${keyFullName}</option>`;
                    to.innerHTML += `<option value="${key}">${key} — ${keyFullName}</option>`;
                });

                from.value = "USD";
                to.value = "EGP";
                updateFlags();
            });
    })
    .catch((err) => {
        resultDiv.textContent = `Unable to connect to live exchange API: ${err.message}`;
    });

swap.addEventListener("click", () => {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    updateFlags();
});

from.addEventListener("change", updateFlags);
to.addEventListener("change", updateFlags);

convertBtn.addEventListener("click", () => {
    resultDiv.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Calculating...`;
    
    fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${from.value}`)
        .then((res) => res.json())
        .then((data) => {
            rates = data.conversion_rates;

            let amount = parseFloat(belInpuit.value);
            const fromCurrency = from.value;
            const toCurrency = to.value;

            if (isNaN(amount) || amount <= 0) {
                amount = 1;
                belInpuit.value = "1";
            }

            const convertedAmount = (amount * rates[toCurrency]).toFixed(3);
            resultDiv.innerHTML = `<strong>${amount} ${fromCurrency}</strong> = <span class="text-info"><strong>${convertedAmount} ${toCurrency}</strong></span>`;
        })
        .catch((err) => {
            resultDiv.textContent = `Conversion error: ${err.message}`;
        });
});
