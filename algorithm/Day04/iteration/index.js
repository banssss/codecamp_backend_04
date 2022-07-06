function toggle(_target) {
    const target = document.getElementById(_target);
    const angel = target.parentElement.childNodes[1].childNodes[3];
    const title = target.parentElement.childNodes[1].childNodes[1];

    if(target.classList.contains('open') === false) {
        target.style.display = 'block';
        target.classList.add('open')

        title.style.color = 'black';
        angel.src = 'close.png';

    } else {
        target.style.display = 'none';
        target.classList.remove('open');

        title.style.color = '#ababab';
        angel.src = 'open.png';

    }
}

function checkNumber(num) {
    if(num <= 0 || typeof num !== 'number') {
        return false;
    }
}

function sum() {
    const target = document.getElementById('sum');
    const value = Number(document.getElementsByName('sum')[0].value);

    let result = 0;
    for(let i = 0; i <= value; i++) {
        result = result + i;
    }

    if(checkNumber(value) === false) {
        target.innerText = 'null';
    } else {
        target.innerText = result;
    }
}

function countLetter() {
    const target = document.getElementById('countLetter');
    const value = document.getElementsByName('countLetter')[0].value;

    if(value.length === 0) {
        return target.innerText = 'null';
    }

    let result = 0;
    for(let i = 0; i < value.length; i++) {
        if(value[i] === 'a' || value[i] === 'A') {
            result = result + 1;
        }
    }
    
    target.innerText = result;
}

function makeNumber() {
    const target = document.getElementById('makeNumber');
    const value = Number(document.getElementsByName('makeNumber')[0].value);

    let result = '';
    for(let i = 1; i <= value; i++) {
        result = result + i;

        if(i !== value) {
            result = result + '-';
        }
    }

    if(checkNumber(value) === false) {
        target.innerText = 'null';
    } else {
        target.innerText = result;
    }
}

function makeOdd() {
    const target = document.getElementById('makeOdd');
    const value = Number(document.getElementsByName('makeOdd')[0].value);

    let result = '';
    for(let i = 1; i <= value; i++) {
        if(i % 2 === 1) {
            result = result + i + " ";
        }
    }

    if(checkNumber(value) === false) {
        target.innerText = 'null';
    } else {
        target.innerText = result;
    }
}

function bigNum() {
    const target = document.getElementById('bigNum');
    const value = document.getElementsByName('bigNum')[0].value;

    if(value.length === 0) {
        return target.innerText = 'null';
    }

    let biggest = 0;
    for(let i = 0; i < value.length; i++) {
        if(Number(value[i]) > biggest) {
           biggest = Number(value[i]);
        }
    }

    target.innerText = biggest;
}