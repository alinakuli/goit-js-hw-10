// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector('.form');
const submitBtn = promiseForm.querySelector('button[type="submit"]');


promiseForm.addEventListener("submit", event => {
    event.preventDefault();
    const delay = Number(promiseForm.elements['delay'].value);
    const state = promiseForm.elements['state'].value;

    createPromise(delay, state).then(delay => {
        iziToast.show({
            title: '✅',
            message: `Fulfilled promise in ${delay}ms`,
            titleColor: '#fff',
            messageColor: '#fff',
            backgroundColor: '#59a10d',
        })
    }).catch(delay => {
        iziToast.show({
            title: '❌',
            message: `Rejected promise in ${delay}ms`,
            titleColor: '#fff',
            messageColor: '#fff',
            backgroundColor: '#ef4040',
        })
    });

    promiseForm.reset();
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
           }
        }, delay)
    })

}