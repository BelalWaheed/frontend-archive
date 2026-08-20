const productDiv = document.querySelector(".productDiv");
const btn = document.querySelector(".btn");
console.log(productDiv);

btn.addEventListener("click", () => {
    productDiv.innerHTML = "";
    fetch("/Lec_11/JS/data.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let Total = data
                .map((product) => {
                    return product.productPrice;
                })
                .reduce((num1, num2) => {
                    return num1 + num2;
                });
            data.map((product) => {
                let content = `
            <div class="d-flex justify-content-evenly " >
                <h1>Product Name : ${product.productName || "Not found"} </h1>
                <h1>Product Name : ${product.productPrice || "Not found"} </h1>
            </div>
            `;
                productDiv.innerHTML += content;
            });
            let TotalH = `<h1 class="text-center text-danger mt-" >Total Price : ${Total} </h1>`;
            productDiv.innerHTML += TotalH;
        });
    console.log(productDiv);

    if (productDiv.style.display == "block") {
        productDiv.style.display = "none";
    } else productDiv.style.display = "block";
});
