const memeDiv = document.querySelector(".memeDiv"),
    btn = document.querySelector(".btn"),
    belInpute = document.querySelector(".belInpute");
btn.addEventListener("click", () => {
    memeDiv.innerHTML = "";
    fetch("https://api.imgflip.com/get_memes")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const memes = data.data.memes,
                memeNum = +belInpute.value;

            if (isNaN(memeNum) || memeNum < 0 || memeNum > 99)
                memeDiv.innerHTML = "Enter a vailde number";
            else {
                memeDiv.innerHTML = `
                <h1> ${memes[memeNum].name} </h1>
                <img src="${memes[memeNum].url}" alt="Mem image">
                `;
            }
        });
});
