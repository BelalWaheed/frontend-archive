var myH1 = document.getElementsByClassName("bh1");
for (var i = 0; i < 4; i++) {
  if (myH1[i].textContent == 3) {
    console.log((myH1[i].style.color = "red"));
  } else {
    console.log((myH1[i].style.color = "blue"));
  }
}
