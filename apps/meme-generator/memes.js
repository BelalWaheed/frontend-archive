const memeDiv = document.querySelector("#memeContainer");
const btn = document.querySelector("#showBtn");
const belInpute = document.querySelector(".belInpute");

btn.addEventListener("click", () => {
    memeDiv.innerHTML = `<span class="spinner-border spinner-border-sm text-info" role="status"></span> Loading...`;
    
    fetch("https://api.imgflip.com/get_memes")
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => {
            const memes = data.data.memes;
            const memeNum = parseInt(belInpute.value, 10);

            if (isNaN(memeNum) || memeNum < 0 || memeNum >= memes.length) {
                memeDiv.innerHTML = `<span class="text-danger fw-bold">Please enter a valid number between 0 and ${memes.length - 1}</span>`;
            } else {
                const selected = memes[memeNum];
                memeDiv.innerHTML = `
                    <h5 class="text-info my-2 fw-bold">${selected.name}</h5>
                    <img src="${selected.url}" alt="${selected.name}" class="shadow-sm">
                `;
            }
        })
        .catch((err) => {
            memeDiv.innerHTML = `<span class="text-danger">Failed to fetch memes: ${err.message}</span>`;
        });
});
