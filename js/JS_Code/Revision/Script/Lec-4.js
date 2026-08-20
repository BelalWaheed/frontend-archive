// 	Alert and prompt

// let attemp_1 = prompt("choise a club"), //-> string
//   attemp_2 = confirm("choise a club"), //-> 0 or 1
//   myH1 = document.querySelector("h1");

// if (attemp_1) {
//   myH1.innerHTML = "Your club is " + attemp_1;
// } else if (attemp_1 == "") {
//   myH1.innerHTML = "you didn't choice";
// } else {
//   myH1.innerHTML = "invaild";
// }

//__________________________
//some ex for array and for
let arr = ["Belal", "Waheed", "Sadek", "Ali"],
  myH1 = document.querySelectorAll("h1");
// Ex:1
for (let i = 0; i < myH1.length; i++) {
  myH1[i].innerHTML = arr[0];
}
// Ex:2
for (let i = 0; i < myH1.length; i++) {
  myH1[i].innerHTML = arr[i];
}
// Ex:3
for (let i = 0; i < myH1.length; i++) {
  for (let j = 0; j < myH1.length; j++) {
    myH1[i].innerHTML += arr[j];
  }
}
// Ex:4
for (let i = 0; i < myH1.length; i++) {
  for (let j = 0; j < myH1.length; j++) {
    myH1[i].innerHTML += arr[j] + " | ";
  }
}
