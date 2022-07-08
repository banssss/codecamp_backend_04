function toggle(_target) {
    const target = document.getElementById(_target);
    const angel = target.parentElement.childNodes[1].childNodes[3];
    const title = target.parentElement.childNodes[1].childNodes[1];

    if(target.classList.contains('open') === false) {
        target.style.display = 'block';
        target.classList.add('open');

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

function openDebug(_target, open) {
    const target = document.getElementById(_target);

    if(open) {
        target.style.display = 'block';
    } else {
        target.style.display = 'none';
    }
}

function grades() {
    const value = Number(document.getElementsByName('grade')[0].value);
    const target = document.getElementById('grade');

    openDebug('gradeDebug', false)
    gradeDebugFn(value);

    let result = '';
    if(value > 100 || value < 0 ) {
        result = '잘못된 점수입니다.'

    } else if(value >= 90 && value <= 100) {
        result = 'A';

    } else if(value >= 80 && value <= 89) {
        result = 'B';

    } else if(value >= 70 && value <= 79) {
        result = 'C';

    } else if(value >= 60 && value <= 69) {
        result = 'D';

    } else if(value <= 59) {
        result = 'F';
    }

    target.innerText = result;
}

function gradeDebugFn(value) {
    const target = document.getElementById('gradeDebug');

    let debug = `<div id='gradeDebugWrapper'> function grade(score) {`;

    // 100점 초과, 0점 미만
    debug += `<div class=${value > 100 || value < 0 ? 'aaa' : null}> if (score > 100 || score < 0) { <br />　　console.log('잘못된 점수입니다.') </div>`

    // 90 ~ 100 점 사이
    debug += `<div class=${value >= 90 && value <= 100 ? "aaa" : null}> } else if (score >= 90 && score <= 100) { <br />　　console.log("A") </div>`

    // 80점 ~ 89점 사이
    debug += `<div class=${value >= 80 && value <= 89 ? "aaa" : null}> } else if (score >= 80 && score <= 89) { <br />　　console.log("B") </div>`

    // 70점 ~ 79점 사이
    debug += `<div class=${value >= 70 && value <= 79 ? "aaa" : null}> } else if (score >= 70 && score <= 79) { <br />　　console.log("C") </div>`

    // 60점 ~ 69점 사이
    debug += `<div class=${value >= 60 && value <= 69 ? "aaa" : null}> } else if (score >= 60 && score <= 69) { <br />　　console.log("D") </div>`

    // 59점 이하
    debug += `<div class=${value <= 59 && value >= 0 ? "aaa" : null}> } else if (score <= 59) { <br />　　console.log("F") <br /> } </div>`

    // if(value > 100 || value < 0) {
    //     debug += `<div class='black left'>`
    // } else {
    //     debug += `<div>`
    // }
    // debug += `if (score > 100 || score < 0) { <br />　　console.log('잘못된 점수입니다.') </div>`

    // 90 ~ 100 점 사이
    // if(value >= 90 && value <= 100) {
    //     debug += `<div class='black left'> } `
    // } else {
    //     debug += `<div> } `
    // }
    // debug += ` else if (score >= 90 && score <= 100) { <br />　　console.log("A") </div>` 

    // 80점 ~ 89점 사이
    // if(value >= 80 && value <= 89) {
    //     debug += `<div class='black left'> } `
    // } else {
    //     debug += `<div> } `
    // }
    // debug += ` else if (score >= 80 && score <= 89) { <br />　　console.log("B") </div>` 

    // // 70점 ~ 79점 사이
    // if(value >= 70 && value <= 79) {
    //     debug += `<div class='black left'> } `
    // } else {
    //     debug += `<div> } `
    // }
    // debug += ` else if (score >= 70 && score <= 79) { <br />　　console.log("C") </div>` 

    // 60점 ~ 69점 사이
    // if(value >= 60 && value <= 69) {
    //     debug += `<div class='black left'> } `
    // } else {
    //     debug += `<div> } `
    // }
    // debug += ` else if (score >= 60 && score <= 69) { <br />　　console.log("D") </div>` 

    // 59점 이하
    // if(value <= 59 && value >= 0) {
    //     debug += `<div class='black left'> } `
    // } else {
    //     debug += `<div> } `
    // }
    // debug += ` else if (score <= 59) { <br />　　console.log("F") <br /> } </div>` 


    debug += `} </div>`;

    target.innerHTML = debug;
    openDebug('gradeDebug', true)

}


let page = 0;
const myShopping = [
    { category: "과일", price: 12000　},
    { category: "의류", price: 10000　 },
    { category: "의류", price: 20000　},
    { category: "장난감", price: 9000 },
    { category: "과일", price: 5000　 },
    { category: "의류", price: 10000  },
    { category: "과일", price: 8000　},
    { category: "의류", price: 7000　},
    { category: "장난감", price: 5000  },
    { category: "의류", price: 10000　},
]

let myPageDebugArr = [];
function myPage(event) {
    const value = event.target.value;
    const target = document.getElementById('myPage');

    page = 0;

    openDebug('myPageDebug', true)
    myPageDebug(value);

    let count = 0;
    let price = 0;

    for(let i = 0; i < myShopping.length; i++) {
        if(myShopping[i].category === value) {
            count = count + 1;
            price = price + myShopping[i].price
        }
    }

    let grade = '';
    if(count >= 0 && count <= 2) {
        grade = 'Bronze';

    } else if(count >= 3 && count <= 4) {
        grade = 'Silver';

    } else if(count >= 5) {
        grade = 'Gold';
    }

    target.innerText = value + '를 구매한 횟수는 총 ' + count + '회, 금액은 ' + price + '원이며 등급은 ' + grade + '입니다.';
}

function myPageDebug(value) {
    const target = document.getElementById('myPageDebugContents');
    myPageDebugArr = [];

    let count = 0;
    let price = 0;
    let grade = "Bronze";

    let ment = `
        <div class='myPageDebugWrapper'> 
            <div class='myPageArrayInfo'>
                <div> const myShopping = [ </div>`;

    for(let i = 0; i < myShopping.length; i++) {
        if(myShopping[i].category === value) {
            if(i <= page) {
                count = count + 1;
                price = price + myShopping[i].price;

                if(count >= 0 && count <= 2) {
                    grade = 'Bronze';
            
                } else if(count >= 3 && count <= 4) {
                    grade = 'Silver';
            
                } else if(count >= 5) {
                    grade = 'Gold';
                }
            }
        }

        if(page === i) {
            ment += `<div class='infos selectIdx'>`

        } else {
            ment += `<div class='infos'>`
        }

        ment += '{ category : ' + myShopping[i].category + ', ';
        ment += 'price : ' + myShopping[i].price + ' }'
        if(i !== myShopping.length - 1) {
            ment += ',';
        }
        ment += `</div>`
        // }
    }
    // myPageArrayInfo 닫음
    ment += `] </div>`

    ment += `<div class='myPageForInfo'>`

    if(myShopping[page].category !== value) {
        ment +=  `<div id='myPageForInfos'>`

    } else {
        ment +=  `<div id='myPageForInfos' class='yellow'>`
    }
    
    ment += `
        <div> count : ${count} </div>
        <div> price : ${price} </div>
        <div> grade : ${grade} </div>
    </div>`;

    ment += `
        <div id='myPageForContents'> 
    `
    ment += `for(let i = <b>${page}</b>;　i < myShopping.length;　i = i + 1 ) { `
    
    ment += `<div class='left margin'>`
    if(myShopping[page].category === value) {
        ment += `<div class='black'>`
    } else {
        ment += `<div>`
    }
    ment += `if( myShopping[i].category === "${value}" ) {
        <div class='left'> count = count + 1; </div>  
        <div class='left'> price = price + myShopping[i].price; </div>
        <br /> <br />
    `

    ment += `<div id='myPageForGrade' class='left'>
        <div class=${count >= 5 && myShopping[page].category === value ? "black" : undefined} > if( count >= 5 ) { <div class='left'> grade = 'Gold' </div> </div>
        <br /> <div class=${ (count >= 3 && count <= 4) && myShopping[page].category === value ? "black" : undefined}> } else if( count >= 3 && count <= 4 ) { <div class='left'> grade = 'Silver' </div> </div>
        <br /> <div class=${ (count >= 0 && count <= 2) && myShopping[page].category === value ? "black" : undefined}> } else if( count >= 0 && count <= 2 ) { <div class='left'> grade = 'Bronze' </div> } </div>
    `

    ment += `</div>`

    ment += `<div> } </div> </div>`
    ment += `</div>`

    ment += `<div>}</div> </div>`

    // myPageForInfo 닫음
    ment += `</div>`

    ment += `</div>`

    myPageDebugArr.push(ment);

    target.innerHTML = myPageDebugArr[0];
}

// 좌우 이동
function movePage(move) {
    if(move === 'left') {
        if(page !== 0) {
            page = page - 1;
        }

    } else if(move === 'right') {
        if(page !== 9) {
            page = page + 1;
        }
    }

    
    if(page !== 0) {
        document.getElementById('leftIcon').src = '/left.png'
    } else {
        document.getElementById('leftIcon').src = '/left_gray.png'
    }

    if(page !== 9) {
        document.getElementById('rightIcon').src = '/right.png'

    } else {
        document.getElementById('rightIcon').src = '/right_gray.png'
    }

    const value = document.getElementsByName('myPageSelect')[0].value;
    myPageDebug(value);
}