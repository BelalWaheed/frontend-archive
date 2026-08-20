const productsDiv = document.querySelector(".products"),
    btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    fetch("/Lec_11/JS/data.json")
        .then((res) => res.json())
        .then((data) => {
            let arrPrice = data
                .map((product) => {
                    return product.productPrice;
                })
                .reduce((num1, num2) => {
                    return num1 + num2;
                });
            data.map((product) => {
                let content = `
                <div class="d-flex justify-content-evenly align-items-center mt-5">
                    <h1>Name: ${product.productName || "Not found"} </h1>
                    <h1>price: ${product.productPrice} </h1>
                </div>
            `;

                productsDiv.innerHTML += content;
            });
            let totalPrice = `<h1 class="text-center mt-4">Total Price : ${arrPrice} </h1>`;
            productsDiv.innerHTML += totalPrice;
        })
        .catch((e) => {
            console.log(e);
        });
    btn.addEventListener("click", () => {});
});
