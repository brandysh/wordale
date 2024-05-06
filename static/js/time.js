function settime() {
  const time = new Date();
  const 시 = time.getHours().toString();
  const 분 = time.getMinutes().toString();
  const 초 = time.getSeconds().toString();
  const timer = document.querySelector(".timer");
  timer.innerText = `${시.padStart(2, "0")}:${분.padStart(
    2,
    "0"
  )}:${초.padStart(2, "0")}`;
}

setInterval(settime, 1000);
