const bstart = document.querySelector(".b1");
const bend = document.querySelector(".b2");
bstart.addEventListener("click", () => {
  let x = setInterval(() => {
    console.log("hola");
  }, 1000);

  bend.addEventListener("click", () => {
    clearInterval(x);
  });
});
