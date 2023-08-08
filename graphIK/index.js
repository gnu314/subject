//{ value: 40, date: "2023-07-30" }
//초기값 데이터
let data = [];

//초기 데이터 그리기
drawBar(data);

//인터버 함수
let interval = null;

//데이터 입력
const addBtn = document.getElementById("startBtn");
addBtn.addEventListener("click", () => {
  interval = setInterval(getData, 500);
  console.log("start");
});
//입력 중지
const stopBtn = document.getElementById("stopBtn");
stopBtn.addEventListener("click", () => {
  console.log("clear");
  clearInterval(interval);
});

//데이터 추가
function addData(value) {
  const nowTime = new Date();
  data.push({ value, time: nowTime });
}

//막대기 그리기
function drawBar(data) {
  const graphBox = document.getElementById("gBox");
  let barString = "";
  data.map((data, i) => {
    barString += `
          <div class="barWrap">
            <div class="bar" style='height : ${data.value * 5}px'></div>
          </div>`;
  });
  graphBox.innerHTML = barString;
}

//랜덤데이터를 생성해서 그리는 함수
function getData() {
  //랜덤 입력값
  value = Math.floor(Math.random() * 100);
  //데이터 입력
  addData(value);
  drawBar(data);
}
