import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import timeConvert from './timeConvert'
import { Report } from 'notiflix/build/notiflix-report-aio';

const ref = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}
let selectedTime;
let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()) {
          Report.failure("Please choose a date in the future");
          return;
        }
      selectedTime = selectedDates[0].getTime();
      ref.startBtn.disabled = false;
  },
};

ref.startBtn.addEventListener('click', () => {
  if (timer) {
    clearInterval(timer);
  }
  let timeCount = selectedTime - new Date().getTime();
  const timeObj = timeConvert(timeCount);
  updateTimer(timeObj);
  timer = setInterval(() => {
    if (timeCount < 2000) {
      clearTimer(timer);
    }
    timeCount -= 1000;
    const timeObj = timeConvert(timeCount);
    updateTimer(timeObj);
  }, 1000);
})

flatpickr('#datetime-picker', options)

function updateTimer(data) {
  ref.days.textContent = addLeadingZero(String(data.days));
  ref.hours.textContent = addLeadingZero(String(data.hours));
  ref.minutes.textContent = addLeadingZero(String(data.minutes));
  ref.seconds.textContent = addLeadingZero(String(data.seconds));
}
function clearTimer(timer) {
  clearInterval(timer);
}

function addLeadingZero(value) {
  return value.padStart(2, '0')
}
