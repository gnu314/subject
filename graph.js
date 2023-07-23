
let wrap = document.querySelectorAll(".wrap");  //[] 형태로 현재 막대 그래프에서는 0~3까지 나타난다.



    for(let i=0;i<wrap.length;i++){  //그래프가 4개이므르 for문으로 반복해준다.
        let plusValue = 0; 
        let endValue = wrap[i].getAttribute('data-value');
        let graph = wrap[i].querySelector(".graph");
        let span = wrap[i].querySelector("span");
        let fillGraph = setInterval(function() {     
            plusValue++;
            if(plusValue == endValue){
                clearInterval(fillGraph);
            } //plus값이 end 값과 같아졌을 때 멈춘다.
            graph.style.height = `${plusValue}%`; //180도 회전을 시켰으므로 바뀌어야하는 값은 height 
            span.innerHTML = `${plusValue}` 
        
        }, 20);
    }



