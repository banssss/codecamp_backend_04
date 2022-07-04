// const { checkValidationPhone, getToken, sendTokenToSMS } = require("./phone.js")
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

console.log('안 녕 하 세 요!');

function createTokenOfPhone(myphone){
    // 1. 폰 번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);
    if(!isValid){return;}

    // 2. 폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 폰 번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
}

createTokenOfPhone('01012345678');