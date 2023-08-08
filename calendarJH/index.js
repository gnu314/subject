

const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const eventDateDisplay = document.getElementById('event-date-display');
const eventInput = document.getElementById('event');
const eventForm = document.querySelector('.event-form');
const eventList = document.getElementById('event-list');
const events = {}; //객체 생성

//달력 만들기
function generateCalendar(year, month) {
  calendarBody.innerHTML = ''; //없으면 달력이 계속 나온다.

  const firstDay = new Date(year, month);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = firstDay.getDay();  //getDay는 요일을 나타낸다 0이 일요일


  let row = document.createElement('tr');
  
  for (let i = 0; i < firstWeekday; i++) {
    const cell = document.createElement('td');
    cell.classList.add('empty-cell');
    row.appendChild(cell); //tr 안으로 td가 들어간다.
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const cell = document.createElement('td');
    cell.innerHTML = i;
    row.appendChild(cell);
    
    if ((i + firstWeekday) % 7 == 0 || i == lastDay.getDate()) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
  }

  monthYear.innerHTML = `${year}년 ${month + 1}월`;

  //날짜를 누른 후 일정을 추가하고  싶어 만듦
  const cells = calendarBody.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (!cell.classList.contains('empty-cell')) {
        const selectedDate = new Date(year, month, parseInt(cell.innerHTML));
        const formattedDate = selectedDate.toLocaleDateString();
        eventDateDisplay.innerHTML = formattedDate;
        if (events[formattedDate]== '') {
            eventInput.value = events[formattedDate];
          } else {
            eventInput.value = '';
          }
      }
    });
  });
}

//전 달 버튼 누를 때 필요한 것
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentYear--;
    currentMonth = 11;
  }
  generateCalendar(currentYear, currentMonth);
}
//다음 달 버튼 누를 때 필요한 것.
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentYear++;
    currentMonth = 0;
  }
  generateCalendar(currentYear, currentMonth);
}

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

generateCalendar(currentYear, currentMonth);

//추가 버튼을 누르면 나오게끔 하기 위해
eventForm.addEventListener('submit', (e) => {
  e.preventDefault(); //새로고침 방지 AJAX 와 API 적용하면 다른 방식으로 해결 가능하다고 함
  const eventDate = eventDateDisplay.innerHTML;
  const eventContent = eventInput.value;
  if (eventDate && eventContent) {
    events[eventDate] = eventContent;
    eventInput.value = '';
    showEventList();
  }
});

function showEventList() {
    eventList.innerHTML = '';
    for (const date in events) {
      const eventItem = document.createElement('li');
      eventItem.innerHTML = `${date}: ${events[date]}`;
      eventList.appendChild(eventItem);
    }
  }

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
prevBtn.addEventListener('click', prevMonth);
nextBtn.addEventListener('click', nextMonth);