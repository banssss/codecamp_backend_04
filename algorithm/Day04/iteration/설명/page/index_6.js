let i = 0;
let limit = 1;

let page = 1;

const getResult = () => {
    let div = `<div>`;
    for(let i = 0; i < limit; i++) {
        div += `<div> 안녕하세요? </div>`;
    }
    div += `</div>`;

    document.getElementById('loof_example_result').innerHTML = div;
}

const getLoof = () => {
    let div = `<div>`;
        div += i < 5 ? `<div> for( let i = <b class='blue'>${i}</b>; i < 5; <b class='green'>i = i + 1</b> ) { </div>`
                     : `<div> for( let i = <b class='blue'>${i}</b>; <b class='red'>i < 5</b>; i = i + 1 ) { </div>`;

        div += `<div style="padding : 20px 70px; font-size: 27px;"> console.log("안녕하세요?") </div>`
        div += `<div> } </div>`
    div += `</div>`;

    document.getElementById('loof_example_flex').innerHTML = div;

}

const setInit = () => {
    getResult();
    getLoof();
}

const pageMove = ( type ) => {
    if(type === 'next') {
        if(page < 6) {
            page += 1;
            i += 1;
            
            if(limit < 5) {
                limit += 1;
            }
        }

    } else {
        if(page > 1) {
            page -= 1; 
            limit -= 1;
            i -= 1;

            if(page === 5) {
                limit = 5;
            }
        }
    }

    getResult();
    getLoof();

    document.getElementById('currentPage').innerText = page;
}