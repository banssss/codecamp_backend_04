const maxPage = 8;
let currentPage = 0;

const movePrev = () => {
    // currentPage = Number(document.getElementById('currentPage').innerText);

    if(currentPage > 0) {
        currentPage = currentPage - 1;

        document.getElementById('currentPage').innerText = currentPage;
        pageMove(currentPage); //
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
    const frame = document.getElementById('loof_contents_frame');
    frame.src = `./page/index_${page}.html`;
}