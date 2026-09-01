const height = 170;
const width = 240;
let topOffset = -height / 2;
let leftOffset = -width / 2;
let nextZindex = 1;
let buttonClicked;

export default function (msg, buttonsArray = [], callback) {
    console.log(msg, buttonsArray);
    let buttons; 
    if (!buttonsArray || buttonsArray.length === 0) {
        buttons = ['OK'];
    } else if (!Array.isArray(buttonsArray)) {
        buttons = [buttonsArray];
    }
    else {
        buttons = buttonsArray;
    }

    const div = document.createElement('div');
    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '6.5em';
    div.appendChild(msgDiv);
    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.boxSizing = 'border-box';
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.marginTop = `${topOffset}px`;
    div.style.marginLeft = `${leftOffset}px`;

    const buttonDiv = document.createElement('div');
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.left = '0';
    buttonDiv.style.width = '100%';
    buttonDiv.style.textAlign = 'center';
    topOffset +=10;
    leftOffset +=10;

    if (topOffset + height + (window.innerHeight / 2) > window.innerHeight) {
        topOffset -= window.innerHeight - height;
    }
    if (leftOffset + width + (window.innerWidth / 2) > window.innerWidth) {
        leftOffset -= window.innerWidth - width;
    }

    div.addEventListener('click', () => {
        div.style.zIndex = nextZindex++;
    })

    buttons.forEach(button => {
        const b = document.createElement('button');
        b.innerText = button;
        b.style.margin = '.25em';
        b.addEventListener('click', e => {
            buttonClicked = e.target.lastChild.nodeValue;
            console.log(`${buttonClicked} button was clicked`);
            div.remove();
        });
    buttonDiv.appendChild(b);
    });
    
    div.appendChild(buttonDiv);
    document.body.appendChild(div);

    if (typeof callback === 'function') {
        callback();
    }
   
}