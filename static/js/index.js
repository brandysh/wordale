/*const 정답 = "APPLE";

let attemps = 0;
let index = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:10vh; left:30vw; background-color:green; width:500px; height:500px;";
    document.body.appendChild(div);
    div.className = "scale-up-center";
  };
  const nextline = () => {
    if (attemps === 6) return gameover();
    attemps += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
  };
  const handleEnterkey = async () => {
    let 맞은_갯수 = 0;

    // 서버에서 정답을 받아오는 코드
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-cloumn[data-index='${attemps}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6aaa64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextline();
  };

  const handleBackspace = () => {};

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-cloumn[data-index='${attemps}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();

    if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  window.addEventListener("keydown", handlekeydown);
}

appStart();
*/

const 정답 = "APPLE";

// let = 수정이 가능한 변수
let index = 0; // 0부터 시작
let attempts = 0; // 0번째 시도(attemps = 한줄을 의미)
let timer;

//키입력 함수//
function appStart() {
  // 게임오버 화면
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:10vh; left:30vw; background-color:green; width:500px; height:500px;";
    document.body.appendChild(div);
    div.className = "scale-up-center";
  };
  const gameover = () => {
    //키다운 이벤트를 지움
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    //게임오버시 타이머를 멈춰줌
    clearInterval(timer);
  };

  //다음줄로
  const nextline = () => {
    //만약 6번째 시도면 게임오버를  호출하고 리턴
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은_갯수 = 0;
    //특정 횟수를 반복하면서 판단하기위한 조건문(정답 단어와 같은지 확인)
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        // 원하는 변수를 지정 = 백틱(`${}`)
        `.board-cloumn[data-index='${attempts}${i}']`
      );
      //입력한_글자와 정답_글자를 비교
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      //입력한_글자와 정답_글자가 같으면 배경을 #c9b458색으로
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      }
      //그렇지 않고 정답 안에 입력한_글자가 포함이 되어있으면 true 이때 배경을 #C9B458색으로
      else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    //맞은_갯수가 5이면 게임오버 호축
    if (맞은_갯수 === 5) gameover();
    //다음줄로 호출
    else nextline();
  };
  //한칸씩 지우기
  const handleBackpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-cloumn[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    //toUpperCase() => 대문자로 변경
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      // 원하는 변수를 지정 = 백틱(`${}`)
      `.board-cloumn[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackpace();
    // 만약 인덱스가 = 5이면 Enter키를 누르면 handleEnterkey를 호출 아니면 리턴해라
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    }

    //만약 키코드가 65~90번이면 키입력 하고 다음 인덱스로 이동, A~Z만 인식(키코드를 이용 / &&=AND)
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      // 다음칸으로 이동 = index += 1 / index++ / index = index +1 은 모두 같은 표현
      index += 1;
    }
  };
  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function settime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }
    timer = setInterval(settime, 1000);
  };

  //스타트타이머 호출
  startTimer();
  // 키를 눌렀을 때 발생하는 이벤트
  window.addEventListener("keydown", handleKeydown);
}

appStart();
