const maxPage = 6;
let currentPage = 0;

const arr = [ 1, "안녕하세요?", { "key" : "value" }, ["2"] ];
const current_arr = arr.slice()
// const current_arr = [ 1, "안녕하세요?", { "key" : "value" }, ["2"], 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 15 ];

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
    const frame = document.getElementById('array_contents_frame');
    frame.src = `./page/index_${page}.html`;
}

const changeIndex = () => {
    const idx = Number(document.getElementById('index_input').value);
    document.getElementById('array_index_result').innerText = JSON.stringify(arr[idx]);
}

const setList = () => {
    let div = `<div>`;

    for(let i = 0; i < current_arr.length; i++) {
        div += `<div> ${typeof current_arr[i] !== 'number' ? JSON.stringify(current_arr[i]) : current_arr[i]}`;
        div += `${(i + 1) < current_arr.length ? ',' : ''} </div>`;
    }

    div += `</div>`

    document.getElementById('current_array_list_item').innerHTML = div;
}

const setValue = ( data ) => {
    if(data.includes(`"`)) {
        return data.replaceAll(`"`, '');

    } else if(data.includes(`'`)) {
        return data.replaceAll(`'`, "")
    }
}

const arrayFuncton = ( functions ) => {
    if(functions !== 'pop' && functions !== 'shift') {
        let data = document.getElementsByName(functions)[0].value;
        data = Number.isNaN(Number(data)) ? setValue(data) : Number(data)

        if(functions === 'push' || functions === 'unshift') {
            if(functions === 'push') {
                current_arr.push(data);

            } else if(functions === 'unshift') {
                current_arr.unshift(data);
            }

            document.getElementsByName(functions)[0].value = ""
            setList();

        } else if(functions === 'indexOf' || functions === 'includes') {
            let result = '';
            if(functions === 'indexOf') {
                result = current_arr.indexOf(data);

            } else {
                result = current_arr.includes(data);
            }
            document.getElementById(`${functions}_result`).innerText = result;

        }

    } else {
        if(functions === 'pop') {
            current_arr.pop();

        } else if(functions === 'shift') {
            current_arr.shift();
        }
        setList();
    }
}