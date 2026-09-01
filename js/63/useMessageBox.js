import showMessage from "./messageBox.js";

showMessage('it works!', 'OK');

const msgInput = document.querySelector('#msg');
const butInput = document.querySelector('#buttonsArray');
document.querySelector('#showMessage').addEventListener('submit', (e) => {
    e.preventDefault();
    const trimmedInput = butInput.value.trim();
    const finalButtons = trimmedInput ? trimmedInput.split(',').map(item => item.trim()) : undefined;
    showMessage(msgInput.value, finalButtons);
});