function setCss(element, property, value) {
    element.style[property] = value;
}
function getCss(element, property) {
    return getComputedStyle(element)[property];
}
function on(element, eventType, callback) {
    element.addEventListener(eventType, callback);
}
function click(element, callback) {
    element.addEventListener('click', callback);
}
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`;
}
function getText(element) {
    return element.innerText;
}
function setText(element, string) {
    element.innerText = string;
}

export default function pcsTools(selector) {
    const element = document.querySelector(selector);
    return {
        css: function(property, value) {
            if (arguments.length < 2) {
                return getCss(element, property);
            } 
            setCss(element, property, value);
            return this;
        },
        click(callback) {
             on(element, 'click', callback);
             return this;
        },
        on(eventType, callback) {
            on(element, eventType, callback);
            return this;
        },
        hide() {
            setCss(element, 'display', 'none');
            return this;
        },
        show() {
            setCss(element, 'display', 'inline-block');
            return this;
        },
        sparkle(speed, duration) {
            const originalColor = element.style['color'];
            const interval = setInterval(() => {
                setCss(element, 'color', getRandomColor());
            }, speed);
            setTimeout(() => {
                clearInterval(interval);
                setCss(element, 'color', originalColor);
            }, duration);
        },
        text(string) {
            if (arguments.length < 1) {
                return getText(element);
            }
            setText(element, string);
            return this;
        },
        addClass(className) {
            element.classList.add(className);
        }
    };
}