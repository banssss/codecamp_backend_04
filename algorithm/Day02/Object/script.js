const max_page = 5;
let currentPage = 0;

const obj = {
    "name" : "철수",
    "age" : 12,
    "school" : {
        "name" : "다람쥐 초등학교"
    },
    "friends" : ["영희", "훈이"]
}

const movePrev = () => {
    const frame = document.getElementById('object_contents_frame');

    if(currentPage > 0) {
        currentPage = currentPage - 1;

        document.getElementById('currentPage').innerText = currentPage;
        frame.src = `./page/index_${currentPage}.html`
    } 
}

const moveNext = () => {
    const frame = document.getElementById('object_contents_frame');

    if(currentPage < max_page) {
        currentPage = currentPage + 1;

        document.getElementById('currentPage').innerText = currentPage;
        frame.src = `./page/index_${currentPage}.html`
    }
}

const typeReturn = (data) => {
    const type = typeof data;
    return `<b class=${type === 'number' ? 'blue' : 'red'}> 
        ${type === 'number' ? data : `"` + data + `"`}
    </b>`
}

const setData = () => {
    let div = `<div style="padding-left : 30px"> `;

    const arrToObj = Object.entries(obj);
    for(let i = 0; i < arrToObj.length; i++) {
        const key = arrToObj[i][0];
        const value = arrToObj[i][1];

        div += `<div>`;
        div += `${key} : `;

        if(typeof value !== 'object') {
            div += typeReturn(value)
            
        } else {
            if(Array.isArray(value)) {
                // 배열일 경우
                div += '[' + value.map( el => typeReturn(el) ) + ']'

            } else {
                // 객체일 경우
                div += `{`;
            
                Object.entries(value).forEach( (el, i) => {
                    div += `<div style="padding-left : 30px"> 
                        ${`"` + el[0] + `"`} : ${typeReturn(el[1])}

                        ${ (i + 1) < Object.entries(value).length ? ',' : '' }
                    </div>`
                }) 

                div += `}`;
            }
        }

        if( (i + 1) < arrToObj.length ) {
            div += `, `
        }

        div += `</div>`;
    }
    div += `</div>`;

    document.getElementById('object_const_contents').innerHTML = div;    
}

const removeFunction = () => {
    const key = getKeys(document.getElementsByName('remove')[0].value);

    if(key.length === 1) {
        delete obj[key[0]];

    } else {
        delete obj[key[0]][key[1]];
    }

    setData();
}

const addFunction = () => {
    const key = getKeys(document.getElementsByName('add_key')[0].value);
    const value = getValue(document.getElementsByName('add_value')[0].value);

    if(key.length === 1) {
        obj[key[0]] = value;

    } else {
        if(obj[key[0]] === undefined || typeof obj[key[0]] !== 'object') {
            obj[ key[0] ] = {}
        }
        console.log(obj[ key[0] ])
        obj[ key[0] ][ key[1] ] = value;
    }

    setData();
}

// 키 뽑기
const getKeys = (key) => {
    return key.split(".")
}

// 값 분류하기
const getValue = (value) =>{
    if(Number.isNaN( Number(value) )) {
        return value.slice(1, value.length - 1)

    } else {
        return Number(value)
    }
}