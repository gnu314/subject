const ymBtn = document.getElementById("yearMinus");
const ypBtn = document.getElementById("yearPlus");
const mmBtn = document.getElementById("monthMinus");
const mpBtn = document.getElementById("monthPlus");

let yearV = new Date().getFullYear();
let monthV = new Date().getMonth() + 1;
let eventList = [];

setInit();

ymBtn.addEventListener("click", () => {
  yearV -= 1;
  setYearV();
  drawCalendar(yearV, monthV);
});
ypBtn.addEventListener("click", () => {
  yearV += 1;
  setYearV();
  drawCalendar(yearV, monthV);
});
mmBtn.addEventListener("click", () => {
  if (monthV == 1) {
    monthV = 12;
    yearV -= 1;
    setMonthV();
    setYearV();
    drawCalendar(yearV, monthV);
  } else {
    monthV -= 1;
    setMonthV();
    drawCalendar(yearV, monthV);
  }
});
mpBtn.addEventListener("click", () => {
  if (monthV == 12) {
    monthV = 1;
    yearV += 1;
    setMonthV();
    setYearV();
    drawCalendar(yearV, monthV);
  } else {
    monthV += 1;
    setMonthV();
    drawCalendar(yearV, monthV);
  }
});

//이벤트 관련
const dateInput = document.getElementById("eventDate");
const eventContent = document.getElementById("eventContent");
const eventSbmBtn = document.getElementById("eventSubmit");

eventSbmBtn.addEventListener("click", () => {
  const date = dateInput.value;
  const content = eventContent.value;
  eventList.push({ date, content });
  //{date: '2023-08-02', content: '적당한 이벤트 이름'}
  drawCalendar(yearV, monthV);
});

//함수 정의 부
function drawCalendar(year, month) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  const dateArr = getDateArr(year, month);

  //컬럼 만들기
  const column = document.createElement("tr");
  column.setAttribute("id", "firstLine");
  for (i = 0; i <= 6; i++) {
    const tag = ["일", "월", "화", "수", "목", "금", "토"];
    const columnTd = document.createElement("td");
    columnTd.innerHTML = tag[i];
    column.appendChild(columnTd);
  }
  table.appendChild(column);

  //날짜 넣기
  dateArr.forEach((data1) => {
    //tr만드는 부분
    const trElement = document.createElement("tr");
    data1.forEach((data2) => {
      //td만드는 부분
      const tdElement = document.createElement("td");
      if (data2 != null) {
        tdElement.classList.add("cell");
        tdElement.innerHTML = `${data2}<br />`;
      }
      if (dateArr[5].length) tdElement.classList.add("line6");

      //이벤트를 지도에 그리는 부분
      drawEvent(tdElement, data2);

      trElement.appendChild(tdElement);
    });
    table.appendChild(trElement);
  });
}

function getDateArr(year, month) {
  const numOfMonth = new Date(year, month, 0).getDate();
  let result = [];
  let dayArr = [];

  const firstDay = new Date(year, month - 1, 1).getDay();
  //0,  1,  2,  3,  4,  5 , 6
  //일, 월, 화, 수, 목, 금, 토
  for (i = 0; i < firstDay; i++) dayArr.push(null);
  for (i = 1; i <= numOfMonth; i++) dayArr.push(i);
  //[null,null,1,2,3,4,5,6,7,8,9,10, ..., 31]

  for (i = 0; i < 6; i++) {
    result.push(dayArr.splice(0, 7));
  }
  //[
  //  [null,null,1,2,3,4,5]
  //  [6, 7, 8, 9, 10, 11, 12]
  //  [13, 14, 15, 16, 17, 18, 19]
  //  [20, 21, 22, 23, 24, 25, 26]
  //  [27, 28, 29, 30, 31]
  //  []
  //]
  return result;
}

//이벤트 그리는 함수
function drawEvent(tdElement, data2) {
  eventList.forEach((data) => {
    const year = Number(data.date.substr(0, 4));
    const month = Number(data.date.substr(5, 2));
    const day = Number(data.date.substr(8, 2));

    if (year == yearV && month == monthV && data2 == day) {
      const eventElement = document.createElement("span");
      eventElement.innerHTML = `${data.content}<br />`;
      eventElement.style.height = 0;
      tdElement.appendChild(eventElement);
    }
  });
}

function setInit() {
  setYearV();
  setMonthV();

  drawCalendar(yearV, monthV);
}

function setYearV() {
  document.getElementById("year").innerHTML = yearV;
}
function setMonthV() {
  if (monthV < 10) document.getElementById("month").innerHTML = `0${monthV}`;
  else document.getElementById("month").innerHTML = `${monthV}`;
}
