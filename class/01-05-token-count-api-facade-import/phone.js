export function checkValidationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('error detected! 폰 번호를 제대로 입력해 주세요!');
        return false;
    }
    else {return true;}
}

export function getToken(){
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6,'0');
    // console.log(result);
    return result;
}

export function sendTokenToSMS(myphone, result){
    console.log(myphone + " 번호로 인증번호 " + result + " 전송합니다.");
}