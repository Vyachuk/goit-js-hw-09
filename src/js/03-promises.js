import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  form: document.querySelector('.form')
}
let delayCountTime = 0;
let count = 1;

ref.form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = +ref.form.elements.delay.value;
  const step = +ref.form.elements.step.value;
  const amount = +ref.form.elements.amount.value;
  delayCountTime = delay;

  setTimeout(() => {
    const promiseInterval = setInterval(() => {
      createPromise(count, delayCountTime)
        .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
        .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      });
      if (count === amount) {
        clearInterval(promiseInterval);
        return;
      }
      
      delayCountTime += step;
      count += 1;
    }, step);
  }, delay);
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({ position, delay });
    }
  });
  return promise;
}
