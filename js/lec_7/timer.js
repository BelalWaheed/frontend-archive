// var binp = document.querySelector("input");
var binp = document.querySelector("h1");

var binc = document.querySelector(".btn-primary");
var bre = document.querySelector(".btn-danger");
function bIncrese() {
  //   binp.value.split(":") += 1;
  // var plac = binp.value.indexOf(":");
  // var size = binp.value.length();
  // var se = binp.value.slice(plac + 1, size);
  // var mi = binp.value.slice(0, plac);
  // console.log(binp.value.slice(plac + 1, size));
  var xy = binp.innerHTML.split("0:");
  // console.log(binp.innerHTML.split(""));
  console.log(xy);
  xy.forEach((elem, i) => {
    if (elem != "") {
      binp.innerHTML += 1;
    }
  });
  // for(var i=0;i<xy.length;i++)
  // {
  //   xy[]
  // }
}
function bReset() {
  binp.value = "0:0";
}
binc.addEventListener("click", () => {
  bIncrese();
});
bre.addEventListener("click", () => {
  bReset();
});
