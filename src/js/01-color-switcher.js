const refs = {
  startBtnEl: document.getElementById('startBtn'),
  stopBtnEl: document.getElementById('stopBtn'),
  bodyEl: document.querySelector('body'),
};

let timerId = null;

refs.startBtnEl.addEventListener('click', startColorChange);
refs.stopBtnEl.addEventListener('click', stopColorChange);

// при натисканні на кнопку "Start"
function startColorChange() {
  timerId = setInterval(() => {
    refs.bodyEl.style.background = getRandomHexColor();
  }, 1000);
  inactiveButton(true, false);
}

// при натисканні на кнопку "Stop"
function stopColorChange() {
  clearTimeout(timerId);
  inactiveButton(false, true);
}

// disable
function inactiveButton(startState, stopState) {
  refs.startBtnEl.disabled = startState;
  refs.stopBtnEl.disabled = stopState;
}

// функція для рандомного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
