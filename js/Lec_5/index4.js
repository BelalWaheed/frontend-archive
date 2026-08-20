var egy = document.querySelectorAll(".bola");
var belb = document.querySelectorAll(".d");

function displayDiv(x) {
    var xl = document.getElementById(x);
    for (var i = 0; i < egy.length; i++) {
        if (belb[i].innerHTML == x) {
            xl.style.display = "block";
        } else {
            egy[i].style.display = "none";
        }
    }
}
function removee() {
    for (var i = 0; i < egy.length; i++) {
        egy[i].style.display = "none";
    }
}
