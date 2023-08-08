let current_year = new Date().getFullYear();
let current_month = new Date().getMonth() + 1;

const this_month = document.getElementById("this_month");

const innerMonth = () => {
  this_month.innerText = `${current_year}.${current_month}`;
};

innerMonth();

//윤년 체크
const checkLeapYear = (year) => {
  if (year % 400 == 0 && year % 100 !== 100 && year % 4 == 0) {
    true;
  } else {
    false;
  }
};

//해당 월의 첫번쨰날의 요일 확인
const getFirstDay = (year, month) => {
  return new Date(`${year}-${month}-01`).getDay();
  //getDay가 해당 날짜의 요일을 가져와줌
};

// 달을 바꿨을 때 내부 배열 변경
const changeMonth = (year, month) => {
  let last_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //윤년 체크
  if (month == 2) {
    if (checkLeapYear(year)) {
      last_day[1] = 29;
    }
  }

  let first_day = getFirstDay(year, month);
  let arr = [];
  for (let i = 0; i < first_day; i++) {
    arr.push("");
  }

  for (let i = 1; i < last_day[month - 1] + 1; i++) {
    arr.push(String(i));
  }

  let remain = 7 - (arr.length % 7);

  if (remain < 7) {
    for (let i = 0; i < remain; i++) {
      arr.push("");
    }
  }

  render_calendar(arr);
};

const body = document.getElementById("table_body");
const input = document.getElementById("input_date");

const select_date = (date) => {
  input.value = `${current_year}-${current_month}-${date}`;
};

const render_calendar = (data) => {
  body.innerHTML = "";
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      arr.push("<tr>");
    } else if (i % 7 == 0) {
      arr.push("</tr><tr>");
    }
    if (i == 0 || i % 7 == 0) {
      arr.push(
        `<td style="color:red;" onclick="select_date(${data[i]})">${data[i]}</td>`
      );
    } else if (i == 6 || (i - 6) % 7 == 0) {
      arr.push(
        `<td style="color:blue;" onclick="select_date(${data[i]})">${data[i]}</td>`
      );
    } else {
      arr.push(
        `<td style="color:black;" onclick="select_date(${data[i]})">${data[i]}</td>`
      );
    }
  }

  arr.push("</tr>");

  let final = "";
  arr.map((data) => (final += data));

  body.innerHTML = `${final}`;
};

changeMonth(current_year, current_month);

const increaseMonth = () => {
  current_month = Number(current_month) + 1;
  if (current_month === 13) {
    current_year = current_year + 1;
    current_month = 1;
  }
  changeMonth(current_year, current_month);
  innerMonth();
};
const decreaseMonth = () => {
  current_month = Number(current_month) - 1;
  if (current_month === 0) {
    current_year = current_year - 1;
    current_month = 12;
  }
  changeMonth(current_year, current_month);
  innerMonth();
};

const detail = document.getElementById("input_detail");
const list = document.getElementById("schedule_list");

const add_schedule = () => {
  let text = "";
  let date = "";

  if (input.value !== "") {
    date = input.value;
    if (detail.value !== "") {
      text = detail.value;
      list.insertAdjacentHTML(
        "beforeend",
        `<div class='list'>${date}<br />${text}</div>`
      );
    } else {
      alert("빈 스케쥴은 추가할 수 없습니다.");
    }
  } else {
    alert("날짜를 선택하세요.");
  }

  detail.value = "";
};
