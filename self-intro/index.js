
const close = document.querySelector('.closebutton')

const window = document.querySelector(".window");

close.addEventListener('click', () => {
    window.style.zIndex = "-1";
})