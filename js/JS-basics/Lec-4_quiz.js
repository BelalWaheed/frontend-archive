// var myh1 = document.getElementsByClassName("test");
// var check = prompt("What is your fov club ?");
// for (var i = 0; i < myh1.length; i++) {
//   if (check) {
//     myh1[i].innerHTML = "your fov club is " + check;
//   } else if (check == "") {
//     myh1[i].innerHTML = "you didn't chose a club ";
//   } else {
//     myh1[i].innerHTML = "invalide ";
//   }
// }

//------------------------------
var myh1 = document.getElementsByClassName("test");
var a = ["belal", "waheed", "bale", "ali"];
//    Q1
// for (var i = 0; i < a.length; i++) {
//   myh1[i].innerHTML = a[0];
// }
//    Q2
// for (var i = 0; i < a.length; i++) {
//   myh1[i].innerHTML = a[i];
// }
//    Q3
// for (var i = 0; i < a.length; i++) {
//   for (var i2 = 0; i2 < a.length; i2++) {
//     myh1[i].innerHTML += a[i2];
//   }
// }
//    Q4
for (var i = 0; i < a.length; i++) {
  for (var i2 = 0; i2 < a.length; i2++) {
    myh1[i].innerHTML += a[i2] + " | ";
  }
}
