let date = new Date();
let day=[];
const calendar = document.getElementById("main");


//캘린더에 저장한 일정 불러오기
document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('content')) {
            const dayindex = parseInt(key.replace('content', ''));
            day.push(dayindex);
        }
    }
    renderCalendar();
});

//일정 작성 창 닫기
function closebtn() {
    document.getElementById("schedule").style.display="none";
    if (calendar) {
    calendar.style.opacity = 1;
    }
}

//일정 작성 창 esc로 닫기
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closebtn();
    }
});

//일정 작성 창 띄우기
function Schedule(clicked_id) 
{
    document.getElementById("schedule").style.display="block";
    if (calendar) {
        calendar.style.opacity = 0.3;
    }
    day.push(clicked_id);
    document.getElementById("content").value="";
}

//일정 작성 창 숨김, 캘린더에 작성한 일정 저장
function closesch() {

   closebtn();

    const content = document.getElementById("content").value;
    if(typeof(Storage) !== "undefined")
    {
        localStorage.setItem(`content${day[day.length-1]}`,content);
    }
    const content1 = localStorage.getItem(`content${day[day.length-1]}`);
    const planElement = document.getElementById(`plan${day[day.length-1]}`);
    if (planElement) {
        planElement.textContent = content1;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        closesch();
    }
});

//작성한 일정 삭제
function deletebtn() {
    closebtn();
    
    localStorage.removeItem(`content${day[day.length-1]}`);
    const textContainer = document.getElementById(`plan${day[day.length-1]}`);
    if (textContainer) {
        textContainer.textContent = '';
    }
}
//delete 키로 일정 삭제
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        deletebtn();
    }
});

//캘린더 작성
function renderCalendar() {
    
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year_month').textContent = `${viewYear}년 ${viewMonth + 1}월`;


    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);
  

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [];
    const nextDates = [];
    
    //이전 달 표시되야하는 date
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
        }
    }
    //이번 달 표시될 date
    for(let i=1; i<=TLDate; i++)
    {
        thisDates.push(i);
    }

    //다음 달 표시되야하는 date
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    //배열 합치기(달력에 출력될 배열)
    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
    let condition
    if(i >= firstDateIndex && i <= lastDateIndex)
    {
        condition='this';
    }
    else
    {
        condition='other';
    }
    
    dates[i] =`<div class="date" onclick='Schedule(this.id)' id=${viewYear}${viewMonth + 1}${date}>
            <span class="${condition}">${date}</span>
            <div class="wrap">
            <div class="plan${viewYear}${viewMonth + 1}${date}" id="plan${viewYear}${viewMonth + 1}${date}"></div>
            </div>
            </div>`;
    })
    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (today.getDate() === +date.innerHTML) {
                date.classList.add('today');
                break;
            }
        }
    }

    //달력 나올때 저장되어 있던 일정 출력
    day.forEach(savedDay => {
        const title = localStorage.getItem(`content${savedDay}`);
        const planElement = document.getElementById(`plan${savedDay}`);
        if (planElement) {
            planElement.textContent = title;
        }
    });
}

//이전 달
function prevMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}
//이번 달
function nextMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}
//다음 달
function goToday(){
    date = new Date();
    renderCalendar();
}