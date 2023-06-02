import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const ref = {
    startBtn: document.querySelector('[data-start]')
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()) {
            alert("Please choose a date in the futures")
            return;
        }
        ref.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options)