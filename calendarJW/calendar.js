//Date 객체를 생성하는 방법은 new연산자 사용이 유일
//객체 만들 때 date 0으로 지정할 시 저번 달의 마지막 날짜를 가진 객체 변환
//getMonth는 0~11을 가지므로 금월을 표시하기 위해선 +1
const date = new Date();

console.log(date);

let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//현재 
let t_year = today.getFullYear();
let t_month = today.getMonth();
let t_date = today.getDate();
let t_day = today.getDay();
console.log(t_year, t_month, t_date, t_day);//2023 07 05 6

//저번달 마지막날
let l_Date = new Date(today.getFullYear(),today.getMonth(),0);

let l_year = l_Date.getFullYear();
let l_month = l_Date.getMonth();
let l_date = l_Date.getDate();
let l_day = l_Date.getDay();
console.log(l_year, l_month, l_date, l_day);//2023 06 31 1

//이번달 마지막날
let n_Date = new Date(today.getFullYear(),today.getMonth()+1,0);

let n_year = n_Date.getFullYear();
let n_month = n_Date.getMonth();
let n_date = n_Date.getDate();
let n_day = n_Date.getDay();
console.log(n_year, n_month, n_date, n_day);//2023 07 31 4


function todayCal(year, month, l_day, n_date, n_day){
    let v_year = document.getElementById('year');
    v_year.innerHTML = `${year}`

    let v_month = document.getElementsByClassName('month')[0];
    v_month.innerHTML = `${month}`

    let v_date = document.getElementById('date');
    if(l_day < 6){
        for(a = 0; a <= l_day; a++){
            v_date.innerHTML += `<div class="previous">${l_date-l_day+a}</div>`
        }
    }
    for(a = 0; a <= n_date-1; a++){
        v_date.innerHTML += `<div class="now">${a+1}</div>`
    }
    let now = document.getElementsByClassName("now");
    if(today.getMonth() === date.getMonth()){
        now[t_date-1].classList.add('today');
    }
    if(n_day < 6){
        for(a = 0; a <= 5-n_day; a++){
            v_date.innerHTML += `<div class="later">${a+1}</div>`
        }
    }
}

todayCal(today.getFullYear(),today.getMonth()+1,l_day,n_date,n_day);

let p = 0;
let n = 0;

const left = document.getElementById("left");

left.addEventListener('click',()=>{
    p++;
    today = new Date(t_year,t_month-p+n,t_date);
    let l_Date = new Date(today.getFullYear(),today.getMonth(),0);
    let l_day = l_Date.getDay();
    let n_Date = new Date(today.getFullYear(),today.getMonth()+1,0);
    let n_date = n_Date.getDate();
    let n_day = n_Date.getDay();
    let v_date = document.getElementById('date');
    v_date.innerHTML = '';
    todayCal(today.getFullYear(),today.getMonth()+1,l_day,n_date,n_day);
})

const right = document.getElementById("right");

right.addEventListener('click',function(){
    n++
    today = new Date(t_year,t_month+n-p,t_date);
    let l_Date = new Date(today.getFullYear(),today.getMonth(),0);
    let l_day = l_Date.getDay();
    let n_Date = new Date(today.getFullYear(),today.getMonth()+1,0);
    let n_date = n_Date.getDate();
    let n_day = n_Date.getDay();
    let v_date = document.getElementById('date');
    v_date.innerHTML = '';
    todayCal(today.getFullYear(),today.getMonth()+1,l_day,n_date,n_day);
})

const schedule = document.getElementById("s_day");
const now = document.getElementsByClassName("now");
const date_ = document.getElementById("date");

schedule.innerHTML = `${t_month+1}/${t_date}`

date_.addEventListener('click',function(e){
    schedule.innerHTML = `${t_month+1+n-p}/${e.target.innerHTML}`;
    const submit = document.getElementsByTagName('input')[1];
    const text = document.getElementsByTagName('input')[0];
    const choice = e.target;

    const el = document.createElement('div');
    el.innerHTML = `<div class="schedule">${text.value}</div>`;
    submit.addEventListener('click',()=>{
        choice.appendChild(el);
    })
});








