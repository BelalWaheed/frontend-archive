var egy = document.querySelectorAll(".bola");
function displayDiv(x) {
  for (var i = 0; i < egy.length; i++) {
    egy[i].style.display = "none";
  }
  var xl = document.getElementById(x);
  xl.style.display = "block";
}
function removee() {
  for (var i = 0; i < egy.length; i++) {
    egy[i].style.display = "none";
  }
}
