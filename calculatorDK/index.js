const formula = document.getElementById("formula");
const result = document.getElementById("result");

let numberClick = false;
let equalClick = false;

const number = (prop) => {
  if (equalClick) {
    clear_entry();
    equalClick = false;
  }
  if (result.value) {
    result.value += prop;
    numberClick = true;
  } else {
    result.value = prop;
    numberClick = true;
  }
};

const calculate = (prop) => {
  if (numberClick) {
    let final;
    if (prop !== "=") {
      if (formula.value) {
        formula.value = formula.value + result.value + prop;
      } else {
        formula.value = result.value + prop;
      }
      result.value = "";
      numberClick = false;
    } else {
      equalClick = true;
      if (formula.value) {
        final = formula.value + result.value;
        formula.value = formula.value + result.value + prop;
      } else {
        formula.value = result.value + prop;
      }
      result.value = eval(final);
      numberClick = false;
    }
  } else if (equalClick) {
    formula.value = result.value + prop;
    result.value = "";
    equalClick = false;
  } else {
    alert("올바르지 않은 수식입니다.");
  }
};

const back_space = () => {
  if (result.value.length !== 0) {
    result.value = result.value.slice(0, result.value.length - 1);
  }
};

const clear_result = () => {
  result.value = "";
};

const clear_entry = () => {
  result.value = "";
  formula.value = "";
};
