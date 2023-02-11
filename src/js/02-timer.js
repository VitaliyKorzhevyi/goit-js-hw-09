import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  inputDataEl: document.getElementById('datetime-picker'),
  containerEl: document.querySelector('.timer'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      refs.startBtnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtnEl.disabled = false;
    }
  },
};

let timerId = null;
const dateTime = flatpickr(refs.inputDataEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setDate({ days, hours, minutes, seconds }) {
  refs.containerEl.querySelector('[data-days]').textContent =
    addLeadingZero(days);
  refs.containerEl.querySelector('[data-hours]').textContent =
    addLeadingZero(hours);
  refs.containerEl.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  refs.containerEl.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function timer() {
  const date = new Date();
  const remainder = dateTime.selectedDates[0].getTime() - date.getTime(); // від вибранної останньої дати віднімаємо поточну кількість м-с з 1970
  if (remainder <= 0) {
    return;
  }
  setDate(convertMs(remainder));
}

function clickHandler() {
  refs.timerId = setInterval(timer, 1000);
  refs.startBtnEl.disabled = true;
}

refs.startBtnEl.addEventListener('click', clickHandler);
