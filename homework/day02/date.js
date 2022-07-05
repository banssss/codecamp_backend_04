const now = new Date();
const YYYY = String(now.getFullYear()).padStart(4,'0');
const MM = String(now.getMonth()+1).padStart(2,'0');
const DD = String(now.getDate()).padStart(2,'0');
const HH = String(now.getHours()).padStart(2,'0');
const mm = String(now.getMinutes()).padStart(2,'0');
const ss = String(now.getSeconds()).padStart(2,'0');



const result = `오늘은 ${YYYY}년 ${MM}월 ${DD}일 ${HH}:${mm}:${ss}입니다.`

console.log(result);