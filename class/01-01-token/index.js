console.log('How to avoid WEB Browser.');

// use 'node' command!
// ex) node index.js

//dp 를 넣어 재사용성 높이기
function getToken(dp){
    const result = String(Math.floor(Math.random() * 10 ** dp)).padStart(dp,'0');
    console.log(result);
}

getToken(6);