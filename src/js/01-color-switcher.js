function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const ref = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
}
let timer;

ref.start.addEventListener('click', () => {
    timer = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor(); 
    }, 1000);
    ref.start.disabled = true;
})

ref.stop.addEventListener('click', () => {
    clearInterval(timer);
    ref.start.disabled = false;
})