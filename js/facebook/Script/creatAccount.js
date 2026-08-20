var nameLabel = document.querySelector(".nameLabel");
var nameInput = document.querySelector(".nameInput");
var emailLabel = document.querySelector(".emailLabel");
var emailInput = document.querySelector(".emailInput");
var phoneLabel = document.querySelector(".phoneLabel");
var phoneInput = document.querySelector(".phoneInput");
var passLabel = document.querySelector(".passLabel");
var passInput = document.querySelector(".passInput");
var confirmPassLabel = document.querySelector(".confirmPassLabel");
var confirmPassInput = document.querySelector(".confirmPassInput");
var genderLabel = document.querySelector(".genderLabel");
var genderInput1 = document.querySelector(".genderInput1");
var genderInput2 = document.querySelector(".genderInput2");
var birthdateLabel = document.querySelector(".birthdateLabel");
var birthdateInput = document.querySelector(".birthdateInput");
var vEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var vNum = /^01[0125][0-9]{8}$/;
function forInvalid(x) {
  return x.classList.replace("text-primary", "text-danger");
}
function forvalid(x) {
  return x.classList.replace("text-danger", "text-primary");
}
function handlForm() {
  if (
    nameInput.value == "" ||
    nameInput.value.includes(" ") ||
    nameInput.value[0] != nameInput.value[0].toUpperCase() ||
    nameInput.value.length < 3
  ) {
    nameLabel.innerHTML = "Enter your Name ❌";
    forInvalid(nameLabel);

    return false;
  } else if (!vEmail.test(emailInput.value)) {
    forvalid(nameLabel);
    nameLabel.innerHTML = "Name :";

    forInvalid(emailLabel);
    emailLabel.innerHTML = "Enter a vaild Email  ❌ :";

    return false;
  } else if (!vNum.test(phoneInput.value)) {
    forvalid(emailLabel);
    emailLabel.innerHTML = "Email :";

    forInvalid(phoneLabel);
    phoneLabel.innerHTML = "Enter a vaild Phone number  ❌ ";

    return false;
  } else if (passInput.value.length < 6 || !passInput.value.includes("$")) {
    forvalid(phoneLabel);
    phoneLabel.innerHTML = "Phone Number :";

    passLabel.innerHTML = "Enter a Password contine($)  ❌";
    forInvalid(passLabel);

    return false;
  } else if (passInput.value != confirmPassInput.value) {
    passLabel.innerHTML = "Password :";
    forvalid(passLabel);

    confirmPassLabel.innerHTML = "Password is not match  ❌";
    forInvalid(confirmPassLabel);

    return false;
  } else if (!genderInput1.checked && !genderInput2.checked) {
    confirmPassLabel.innerHTML = "Confirm Password :";
    forvalid(confirmPassLabel);

    genderLabel.innerHTML = "Choose one ❌";
    forInvalid(genderLabel);

    return false;
  } else if (birthdateInput.value == "") {
    genderLabel.innerHTML = "Gender :";
    forvalid(genderLabel);

    forInvalid(birthdateLabel);
    birthdateLabel.innerHTML = "Choose your Birthdate ❌";

    return false;
  } else {
    forvalid(birthdateLabel);
    birthdateLabel.innerHTML = "Birthdate :";

    return true;
  }
}
