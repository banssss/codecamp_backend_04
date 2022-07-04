console.log('안 녕 하 세 요!');

function checkValidationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('error detected! 폰 번호를 제대로 입력해 주세요!');
        return false;
    }
    else {return true;}
}

function getToken(){
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6,'0');
    // console.log(result);
    return result;
}

function sendTokenToSMS(myphone, result){
    console.log(myphone + " 번호로 인증번호 " + result + " 전송합니다.");
}

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