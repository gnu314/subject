const display = document.getElementById('display');    

function appendToDisplay(value) {
    display.value += value;
}

function calculate() {
    display.value = parseFloat(eval(display.value).toFixed(12));
}
  
function clearDisplay() {
    display.value = '';
}

function deleteToDisplay() {
    display.value=display.value.slice(0,-1);
}