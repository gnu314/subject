let resultArr = []; // 눌린 버튼들의 배열
let numBtnArr = []; // 숫자 버튼 배열
let opBtnArr = []; // 연산자 버튼 배열
const resultBox = document.getElementById("result"); // 결과 창

for (let i = 0; i <= 11; i++)
  numBtnArr.push(document.getElementById(`num${i}`));
for (let i = 1; i <= 9; i++) opBtnArr.push(document.getElementById(`op${i}`));

numBtnArr.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    resultArr.push(e.target.value);
    renderResult();
  });
});

opBtnArr.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.value) {
      case "back":
        resultArr.pop();
        if (resultArr.length == 0) resultArr.push(0);
        renderResult();
        break;
      case "clear":
        resultArr = [0];
        renderResult();
        break;
      case "=":
        renderResult(true);
        break;
      default:
        resultArr.push(e.target.value);
        renderResult();
        break;
    }
  });
});

function getResultStr() {
  return resultArr.join("");
}

function renderError() {
  resultBox.innerHTML = "Error";
  setTimeout(() => {
    resultArr = [];
  }, 1000);
}

/**
 *
 * @param {boolean} equal equal 버튼을 클릭했는가?
 * @returns
 */
function renderResult(equal) {
  if (resultArr.length == 0) {
    resultBox.innerHTML = 0;
    return;
  }

  if (equal) {
    try {
      resultBox.innerHTML = eval(getResultStr());
      resultArr = [eval(getResultStr())];
    } catch {
      renderError();
    }
    return;
  }

  resultBox.innerHTML = getResultStr();
}
