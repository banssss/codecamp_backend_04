const maxPage = 7;
let currentPage = 0;

let a = 2;

const movePrev = () => {
    // currentPage = Number(document.getElementById('currentPage').innerText);

    if(currentPage > 0) {
        currentPage = currentPage - 1;

        document.getElementById('currentPage').innerText = currentPage;
        pageMove(currentPage);
    } 
}

const moveNext = () => {
    // currentPage = Number(document.getElementById('currentPage').innerText);

    if(currentPage < maxPage) {
        currentPage = currentPage + 1;

        document.getElementById('currentPage').innerText = currentPage;
        pageMove(currentPage);
    }
}

const pageMove = ( page ) => {
    const frame = document.getElementById('condition_contents_frame');
    frame.src = `./page/index_${page}.html`;
}

const selectFunction = ( number ) => {
    // if(a !== number) {
        document.getElementsByClassName('select')[0].classList.remove('select');
        document.getElementById('select_' + number).classList.add('select');
        
        a = number;

        getObjResult();
    // }
}

const getObjResult = () => {
    console.log(a)
    let div = `<div> <b class=${a > 1 ? 'yellow' : 'red'}> if( a > 1 ) { `;
        div += `<div style="padding-left : 40px; padding-top : 10px" > a 가 1 보다 크다. </div>`;
        div += `<div style="padding-top : 30px"> } </b> <b class=${a === 1 ? 'yellow' : a === 0 && 'red' }> else if( a === 1 ) { </div>`;
        div += `<div style="padding-left : 40px; padding-top : 10px" > a 와 1 이 같다. </div>`;
        div += `<div style="padding-top : 30px"> } </b> <b class=${a < 1 && 'yellow'}> else { </div>`;
        div += `<div style="padding-left : 40px; padding-top : 10px" > a 가 1 보다 작다. </div>`;
    div += `} </b> </div>`;

    document.getElementById('condition_result_showing_wrapper').innerHTML = div;
}