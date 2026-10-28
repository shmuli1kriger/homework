const controlsElem = document.querySelector('#controls');
const mainElem = document.querySelector('#main');
const partsElem = document.querySelector('#parts');
const music = document.querySelector('#music');
const modal = document.querySelector('#modal');
const viewSavedButton = document.querySelector('#viewSavedButton');
const savedPicturesBox = document.querySelector('#savedPicturesBox');
const savedPicturesList = document.querySelector('#savedPicturesList');
const xButton = document.querySelector('#xButton');
const clearHistoryButton = document.querySelector('#clearHistoryButton');
const volumeButton = document.querySelector('#volumeButton');
const saveButton = document.querySelector('#saveButton');
const resetButton = document.querySelector('#resetButton');
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
let musicPlaying = true;
let offset, dragged;
let currentZIndex = 1000;
let savedPictures = JSON.parse(localStorage.getItem('MrPotatoHeadPics')) || [];

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
        partsButton.addEventListener('click', resetParts);
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
        dragged.style.zIndex = ++currentZIndex;
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

function handleMouseUp(e) {
    [mainElem, controlsElem].forEach(container => {
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            container.appendChild(dragged);
        }
    });
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
}


function resetParts() {
    partsButton.style.display = 'none';
    partsElem.querySelectorAll('.partImg').forEach(part => {
        
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
music.play().catch(() => {
    musicPlaying = false;
    volumeButton.style.backgroundPosition = 'left';
    document.addEventListener('pointerdown', () => {
        music.play();
        musicPlaying = true;
        volumeButton.style.backgroundPosition = 'right';
    }, { once: true });
});
volumeButton.addEventListener('click', () => {
    if (musicPlaying) {
        music.pause();
        volumeButton.style.backgroundPosition = 'left';
        musicPlaying = false;
    } else {
        music.currentTime = 0;
        music.play();
        volumeButton.style.backgroundPosition = 'right';
        musicPlaying = true;
    }
});
saveButton.addEventListener('click', () => {
    const picture = [];
    const mainRect = mainElem.getBoundingClientRect();
    mainElem.querySelectorAll('.partImg').forEach(part => {
        const rect = part.getBoundingClientRect();
        picture.push({
            src: part.querySelector('img').getAttribute('src'),
            left: rect.left - mainRect.left,
            top: rect.top - mainRect.top
        });
    });
    savedPictures.push(picture);
    localStorage.setItem('MrPotatoHeadPics', JSON.stringify(savedPictures));
});

resetButton.addEventListener('click', () => {
    [mainElem, controlsElem].forEach(container => {
        container.querySelectorAll('.partImg').forEach(part => part.remove());
    });
    resetParts();
});

viewSavedButton.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.style.zIndex = currentZIndex + 100;
    savedPicturesBox.style.display = 'block';
    savedPicturesBox.style.zIndex = currentZIndex + 200;
    savedPicturesBox.querySelectorAll('.savedPicture').forEach(p => p.remove());
    const mainRect = mainElem.getBoundingClientRect();
    savedPictures.forEach(picture => {
        const wrapper = document.createElement('div');
        wrapper.className = 'savedPicture';
        wrapper.style.width = mainRect.width + 'px';
        wrapper.style.height = mainRect.height + 'px';
        picture.forEach(part => {
            const img = document.createElement('img');
            img.src = part.src;
            img.style.position = 'absolute';
            img.style.left = part.left + 'px';
            img.style.top = part.top + 'px';
            img.style.height = '50px';
            wrapper.appendChild(img);
        });
        const li = document.createElement('li');
        li.append(wrapper);
        li.addEventListener('click', e => {
            console.log(e);
            closeSavedPicturesBox();
            mainElem.querySelectorAll('.partImg').forEach(part => part.remove());
            const mainRect = mainElem.getBoundingClientRect();
            picture.forEach(part => {
                const div = document.createElement('div');
                div.className = 'partImg';
                div.style.position = 'fixed';
                div.style.left = `${mainRect.left + part.left}px`;
                div.style.top = `${mainRect.top + part.top}px`;
                div.style.zIndex = ++currentZIndex;

                const img = document.createElement('img');
                img.src = part.src;
                div.appendChild(img);

                mainElem.appendChild(div);
            });
        });
        savedPicturesList.prepend(li);
    });
});

xButton.addEventListener('click', () => {
    closeSavedPicturesBox();
});
function closeSavedPicturesBox() {
    savedPicturesBox.style.display = 'none';
    modal.style.display = 'none';
}
clearHistoryButton.addEventListener('click', () => {
    savedPictures = [];
    savedPicturesList.querySelectorAll('li').forEach(pic => pic.remove());
    localStorage.removeItem('MrPotatoHeadPics');
});