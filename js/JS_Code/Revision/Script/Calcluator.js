const disInp = document.querySelector(".disInp");
function display(x) {
    disInp.value += x;
}
function clearDisplay() {
    disInp.value = "";
}
function equal() {
    return eval(disInp.value);
}
