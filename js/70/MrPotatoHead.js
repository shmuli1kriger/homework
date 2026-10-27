const partsElem = document.querySelector('#parts');
const music = document.querySelector('#music');
const partsButton = document.querySelector('#partsButton');
const hatsButton = document.querySelector('#hatsButton');
const eyesButton = document.querySelector('#eyesButton');
const earsButton = document.querySelector('#earsButton');
const nosesButton = document.querySelector('#nosesButton');
const mouthsButton = document.querySelector('#mouthsButton');
const handsButton = document.querySelector('#handsButton');
const feetButton = document.querySelector('#feetButton');
const buttons = [hatsButton, 
                eyesButton, 
                earsButton, 
                nosesButton, 
                mouthsButton, 
                handsButton, 
                feetButton
            ];
let offset, dragged;
function addImages(button, type, numberOfPics) {
    button.addEventListener('click', () => {
        for (let i = 1; i <= numberOfPics; i++) {
            partsElem.insertAdjacentHTML('beforeend', `<div class="partImg"><img src="images/${type}/${type}${i}.png" class="${type}Img${i}"></div>`);
        }
        buttons.forEach(button => {
            button.style.display = 'none';
        });
        partsButton.style.display = 'block';
        partsButton.style.height = '25px';
        partsButton.style.maxWidth = '50px';
        partsButton.addEventListener('click', partsButtonClick);
    });  
}

addImages(hatsButton, 'hats', 6);
addImages(eyesButton, 'eyes', 10);
addImages(earsButton, 'ears', 6);
addImages(nosesButton, 'noses', 3);
addImages(mouthsButton, 'mouths', 7);
addImages(handsButton, 'hands', 4);
addImages(feetButton, 'feet', 3);


window.addEventListener('mousedown', e => {
    const part = e.target.closest('.partImg');
    if (part) {
        e.preventDefault();
        dragged = part;
        if (getComputedStyle(dragged).position !== 'fixed') {
            const rect = dragged.getBoundingClientRect();
            dragged.style.position = 'fixed';
            dragged.style.left = `${rect.left}px`;
            dragged.style.top = `${rect.top}px`;
        }
        offset = {x: e.offsetX, y: e.offsetY};
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        //addStylingButtons(e.target);
    }
});

function handleMouseMove(e) {
    dragged.style.top = `${e.clientY - offset.y}px`;
    dragged.style.left = `${e.clientX - offset.x}px`;
}

function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
}


function partsButtonClick() {
    partsButton.style.display = 'none';
    partsElem.querySelectorAll('.partImg').forEach(part => {
        if (getComputedStyle(part).position !== 'fixed')
            part.remove();
    });
    buttons.forEach(button => {
        button.style.display = 'inline-block';
    });
}

function addStylingButtons(element) {
    const resizeButton = element.appendChild('button');
    const rotateButton = element.appendChild('button');
    resizeButton.addEventListener('click', () => {

    });
    rotateButton.addEventListener('click', () => {
        
    });
}

music.volume = 0.5;