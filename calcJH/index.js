let display = document.getElementById('display');
//나타내기
function appendToInput(value) {
  display.value += value;
}
//클리어
function clearInput() {
  display.value = '';
}

//계산
function calculate() {
  let expression = display.value;
  let result = evaluateExpression(expression);
  display.value = result;
}

function evaluateExpression(expression) {
  let symbol = /[-+*/]/;
  let numbers = expression.split(symbol).map(Number); //기호 빼고 다시 배열(숫자로)
  let operators = expression.match(symbol);//기호 저장(배열)
  let result = numbers[0];
  //저장된 기호에 따른 처리
  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case '+':
        result += numbers[i + 1];
        break;
      case '-':
        result -= numbers[i + 1];
        break;
      case '*':
        result *= numbers[i + 1];
        break;
      case '/':
        result /= numbers[i + 1];
        break;
    }
  }
  
  return result;
}