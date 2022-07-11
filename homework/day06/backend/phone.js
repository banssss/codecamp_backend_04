import 'dotenv/config';
import coolsms from 'coolsms-node-sdk';

export function checkValidationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('error detected! 폰 번호를 제대로 입력해 주세요!');
        return false;
    }
    else return true;
}

export function getToken(){
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6,'0');
    // console.log(result);
    return result;
}

export async function sendTokenToSMS(myphone, result){
    const SMS_KEY = process.env.SMS_KEY
    const SMS_SECRET = process.env.SMS_SECRET
    const SMS_SENDER = process.env.SMS_SENDER

    const mysms = coolsms.default;
    const messageService = new mysms(SMS_KEY, SMS_SECRET);
    const response = await messageService.sendOne(
        {
          to: myphone,
          from: SMS_SENDER,
          text: `[Web발신][BS_CAMP] 안녕하세요!! 인증번호는 [${result}] 입니다.`
    });
    console.log(response);

    // console.log(myphone + " 번호로 인증번호 " + result + " 전송합니다.");
}