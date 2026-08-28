let number = 1;

document.querySelector('body').addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
        const newButton = document.createElement('button');        
        document.body.appendChild(newButton);
        newButton.textContent = ++number;
    }
});