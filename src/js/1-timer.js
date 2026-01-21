// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
startBtn.disabled = true;

let userSelectedDate;
let timerId;

const refs = {};

document.querySelectorAll('.value').forEach(el => {
  const key = Object.keys(el.dataset);
  refs[key] = el;
})

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
        startBtn.disabled = true;
          return iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            titleColor: '#fff',
            messageColor: '#fff',
            backgroundColor: 'red',
            });
      } else {
      startBtn.disabled = false;
          return;
      };
    },
};

flatpickr(datePicker, options);

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

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
  return;
}

function addLeadingZero(value){
  return String(value).padStart(2, "0");
};


startBtn.addEventListener('click', () => {
  datePicker.disabled = true;
  startBtn.disabled = true;
  timerId = setInterval(startTimer, 1000);
});

function startTimer() {
  const now = new Date();
  const diff = userSelectedDate - now;
  
  if (diff <= 0) {
    updateTimer(convertMs(0));
    clearInterval(timerId);
    datePicker.disabled = false;
    return;
  }
  
  updateTimer(convertMs(diff));
}
