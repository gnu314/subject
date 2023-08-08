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

//함수 정의 부
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
  //]
  return result;
}

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
    console.log(dateArr);
    const trElement = document.createElement("tr");
    data1.forEach((data2) => {
      const tdElement = document.createElement("td");
      if (data2 != null) tdElement.classList.add("cell");

      if (dateArr[5].length) tdElement.style.height = "16%";
      else tdElement.style.height = "20%";

      if (data2 != null) tdElement.innerHTML = `${data2}<br />`;
      //만약 캘린더를 그릴 때 해당 년, 월에 이벤트가 있을경우
      //해당 날짜에 이벤트 내용을 추가해서 렌더링

      //렌더링 할 때 날짜를 돌면서
      //해당 날짜에 이벤트를 확인하고 있을경우
      //해당 칸에 div를 추가하는 형식
      eventList.forEach((data, i) => {
        const year = Number(data.date.substr(0, 4));
        const month = Number(data.date.substr(5, 2));
        const day = Number(data.date.substr(8, 2));

        if (year == yearV && month == monthV && data2 == day) {
          const eventElement = document.createElement("span");
          eventElement.innerHTML = `${data.content}`;
          eventElement.style.height = 0;
          tdElement.appendChild(eventElement);
        }
      });

      trElement.appendChild(tdElement);
    });
    table.appendChild(trElement);
  });
}

//이벤트 관련

const dateInput = document.getElementById("eventDate");
const eventContent = document.getElementById("eventContent");
const eventSbmBtn = document.getElementById("eventSubmit");

eventSbmBtn.addEventListener("click", () => {
  const date = dateInput.value;
  const content = eventContent.value;
  eventList.push({ date, content });
  //{date: '2023-08-02', content: 'fw'}
  drawCalendar(yearV, monthV);
});
