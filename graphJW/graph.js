const Day = document.getElementById("day");
const mealCheck = document.getElementsByName("meal");
const Button = document.getElementById("submit"); // 이름 Submit으로
const Center = document.getElementsByClassName("center")[0];

Button.addEventListener('click',function(){
    
    let cnt = 0;
    for(i=0; i<6; i++){
        if(mealCheck[i].checked == true){
            cnt++;
        }
    }
    const percentage = Math.ceil((cnt / 6) * 100);
    
    function templateHTML(percentage){
        return `
        ${percentage}%
        `
    }

    Center.innerHTML = templateHTML(percentage); 
    //

    const Donut = document.getElementById("donut_graph");
    const makeChart = (percent, classname, color) => {
        let i = 0;
        const j = percent;
        let chartFn = setInterval(function() {
            if (i <= j) {
                colorFn(i, classname, color);
                colorFn_(i);
                i++;
            }else {
                clearInterval(chartFn);
            }
            },15);
    }

    const colorFn = (i, classname, color) => {
        classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)"; // 백틱으로 처리
    }

    const option = document.getElementsByTagName("option");
    const Bar = document.getElementsByClassName("bar_");
    const Percentage_ = document.getElementsByClassName("percentage");

    const colorFn_ = (t) => {
            if(Day[k]){
                Bar[k].style = "width: 30px; background-color: black; height:" + t + "%";   //백틱으로 처리
                Percentage_[k].innerHTML = templateHTML(percentage);
            }
        
    } // innerHTML 값을 상수로 사용하면 위험함(화면에 있는 값)

    makeChart(percentage, Donut, '#000');
})
//Day.value && Day_[k]