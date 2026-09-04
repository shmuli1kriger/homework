function getElement(selector) {
    return document.querySelector(selector);
}
function setCss(element, property, value) {
    //element.style.property = value;
    element.style[property] = value;
}
function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
}
function on(element, eventType, callback) {
    element.addEventListener(eventType, callback);
}
function click(element, callback) {
    on(element, 'click', callback);
}
function hide(element) {
    setCss(element, 'display', 'none');
}
function show(element) {
    setCss(element, 'display', 'inline-block');
}
//times are in milliseconds
function sparkle(element, timeLength, speed) {
    setCss(element, 'transition', 'color 1s ease-in-out');
    let interval = setInterval(() => {
        element.style.color= `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`;
        }, speed);
    setTimeout(() => {
        clearInterval(interval);
    }, timeLength);
}


export default function (selector) {
    const element = getElement(selector);
    return {
        css: function (property, value) {
            if(arguments.length < 2) {
                return getCss(element, property);
            } else {
                return setCss(element, property, value);
            }
        },
        on: (eventType, callback) => on(element, eventType, callback),
        click: callback => click(element, callback),
        hide: () => hide(element),
        show: () => show(element),
        sparkle: (timeLength, speed) => sparkle(element, timeLength, speed)
    };
}