  // CSV 데이터를 불러와서 처리하는 함수
  function processData(csv) {
    var line = csv.split("\n");  //csv파일 줄바꿈 ㄱ기준으로 변수 line에 저장
    var data = [];
    var maxValue = 0; // 최대값 변수 초기화

    for (var i = 1; i < line.length; i++) {
      var parts = line[i].split(",");
      var year = parseInt(parts[0]);     //https://sisiblog.tistory.com/243 참고 하면 좋음
      var month = parseInt(parts[1]);
      var cases = parseInt(parts[2]);

      data.push({ year: year, month: month, cases: cases }); //data배열에 객체 추가함

      if (cases > maxValue) {
        maxValue = cases; // 최대값 설정
      }
    }

    return { data: data, maxValue: maxValue }; // 데이터와 최대값 반환
  }

  
  function createChart(data, maxValue) {  // 막대 그래프를 생성하는 함수
    var chartContainer = document.getElementById("chart");

    for (var i = 0; i < data.length; i++) {
      var bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = ((Math.max(data[i].cases / maxValue, 0.01)) * 100) + "%";  //해당월 확진/최대 확진자수비율 *100으로 나타냄
      bar.style.left = (i * 50) + "px";  //가로 간격
      chartContainer.appendChild(bar);  //bar요소를 chartcontainer에 추가

      var dateLabel = document.createElement("div"); //날짜 표시 할거  
      dateLabel.className = "date-label"; //클래스 추가
      dateLabel.innerText = data[i].year + "/" + data[i].month; //표시
      bar.appendChild(dateLabel); //막대에 월별 표시 
      //https://yelee.tistory.com/14 appendchild와 append 차이점 처음암

      if ((data[i].cases / maxValue) < 0.1) {
        bar.style.backgroundColor = "green"; // 10% 미만은 초록색
      } else if ((data[i].cases / maxValue) >= 0.1 && (data[i].cases / maxValue) <= 0.5) {
        bar.style.backgroundColor = "yellow"; // 10~50%는 노란색
      } else {
        bar.style.backgroundColor = "red"; // 50% 이상은 빨간색
      }
    }
  }

  // 막대에 마우스를 올렸을 때 툴팁 보이도록 이벤트 리스너 추가
  document.getElementById("chart").addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("bar")) {
      var index = Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
      OnHover(event.target, index);   //index에 해당월 인덱스 저장
    }  //index에 event.target 인덱스 저장 시킴 -> 부모 요소의 자식 요소들을 반환시켜 찾음 참고 https://opentutorials.org/course/1375/6666
  });

 
  document.getElementById("chart").addEventListener("mouseout", function (event) {
    if (event.target.classList.contains("bar")) {  
      removeTooltip(event.target);   
    }
  });


  function OnHover(bar, index) {  //믹대에 확진자수 표시
    var cases = processedData.data[index].cases;
    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.width="150px" 
    tooltip.innerText = "확진자 수: " + cases + "명";
    bar.appendChild(tooltip);
  }

  
  function removeTooltip(bar) { // 마우스 벗어났을때 제거
    var tooltip = bar.querySelector(".tooltip");
    if (tooltip) {
      bar.removeChild(tooltip);
    }
  }

 
  function loadCSV(file) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var csvData = httpRequest.responseText;
        processedData = processData(csvData); // 전역 변수로 대입
        createChart(processedData.data, processedData.maxValue);
      }
    };
    httpRequest.open("GET", file);
    httpRequest.send();
  }  //함수 호출해서 csv파일을 불러옴

  var csvFile = "jinju.csv";  //csv파일 경로 지정 jinju 데이터 포탈에서 가져옴
  
  // CSV 파일 불러오기
  loadCSV(csvFile);