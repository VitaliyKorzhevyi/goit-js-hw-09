import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', startNotificationGenerator);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function startNotificationGenerator(e) {
  e.preventDefault();

  const amount = formEl.elements.amount.value;
  let delayValue = Number(formEl.elements.delay.value);
  const delayStep = Number(formEl.elements.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
      
    delayValue += delayStep;
  }
}


