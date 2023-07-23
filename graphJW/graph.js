const Day = document.getElementById("day");
const mealCheck = document.getElementsByName("meal");
const Button = document.getElementById("submit");
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
        classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)";
    }

    const Day_ = document.getElementsByClassName("day");
    const Bar = document.getElementsByClassName("bar_");
    const Percentage_ = document.getElementsByClassName("percentage");

    const colorFn_ = (t) => {
        for(k=0; k<7; k++){
            if(Day.value === Day_[k].innerHTML){
                Bar[k].style = "width: 30px; background-color: black; height:" + t + "px";
                Percentage_[k].innerHTML = templateHTML(percentage);
            }
        }
    }

    makeChart(percentage, Donut, '#000');
})