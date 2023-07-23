let t;
let t1;
let t2;

const bar = document.querySelector('.progress');
const bar1 = document.querySelector('.progress1');
const bar2 = document.querySelector('.progress2');

bar.style.width = 0;
bar1.style.width = 0;
bar2.style.width = 0;

const totalMinwon = [0, 0, 0];

function handleOnInput(input, barCount) {
  const value = parseInt(input.value);
  if (value < 0) {
      input.value = 0;
  } 
  else if (value > 100) {
      input.value = 100;
  }
}

function test() {
  const number1Value = parseInt(document.getElementById('number1').value);
  const number2Value = parseInt(document.getElementById('number2').value);
  const number3Value = parseInt(document.getElementById('number3').value);

  totalMinwon[0] = number1Value;
  totalMinwon[1] = number2Value;
  totalMinwon[2] = number3Value;

  t = 0;
  t1 = 0;
  t2 = 0;

  const barAnimation = setInterval(() => {
    bar.style.width = t + '%';
    t++ >= totalMinwon[0] && clearInterval(barAnimation);
  }, 10);

  const barAnimation1 = setInterval(() => {
    bar1.style.width = t1 + '%';
    t1++ >= totalMinwon[1] && clearInterval(barAnimation1);
  }, 10);

  const barAnimation2 = setInterval(() => {
    bar2.style.width = t2 + '%';
    t2++ >= totalMinwon[2] && clearInterval(barAnimation2);
  }, 10);

  progress.innerHTML = `${totalMinwon[0]}%`;
  progress1.innerHTML = `${totalMinwon[1]}%`;
  progress2.innerHTML = `${totalMinwon[2]}%`;
}
