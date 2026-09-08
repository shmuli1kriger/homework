import $ from './pcsTools.js';

const tester = $('h1');
console.log(tester.text());
tester.text('This is my new tester!');
tester.addClass('myClass');
tester.css('color', 'red');