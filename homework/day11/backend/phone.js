import 'dotenv/config';
import coolsms from 'coolsms-node-sdk';

export function checkValidationPhone(myPhone){
    if(myPhone.length !== 10 && myPhone.length !== 11){
        console.log('error detected! 폰 번호를 제대로 입력해 주세요!');
        return false;
    }
    else return true;
}

export function getToken(){
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6,'0');
    return result;
}

export async function sendTokenToSMS(myPhone, result){
    const SMS_KEY = process.env.SMS_KEY
    const SMS_SECRET = process.env.SMS_SECRET
    const SMS_SENDER = process.env.SMS_SENDER

    const mySms = coolsms.default;
    const messageService = new mySms(SMS_KEY, SMS_SECRET);
    const response = await messageService.sendOne(
        {
          to: myPhone,
          from: SMS_SENDER,
          text: `[BS_MINIBUCKS] 안녕하세요!! 인증번호는 [${result}] 입니다.`
    });
    console.log(response);
}