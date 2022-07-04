console.log('How to avoid WEB Browser.');

// use 'node' command!
// ex) node index.js

// dp 를 넣어 재사용성 높이기
// 안정성 높이기

function getToken(dp){
    // undefined
    // null

    if(dp === undefined){
        console.log('error detected! 갯수를 정확히 입력해 주세요!');
        return;
    }
    else if(dp === null){
        console.log('error detected! null이 입력되었습니다.');
        return;
    }
    else if(dp <= 0){
        console.log('error detected! 양의 정수를 입력해주세요.');
        return;
    }
    else if(dp > 10){
        console.log('error detected! 10개 이하의 자릿수를 입력해주세요.');
        return;
    }

    const result = String(Math.floor(Math.random() * 10 ** dp)).padStart(dp,'0');
    console.log(result);
}

getToken(10);