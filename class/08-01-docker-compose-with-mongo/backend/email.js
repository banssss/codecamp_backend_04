import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';
import 'dotenv/config';

export function getWelcomeTemplate(name, age, school) {
    const mytemplate = `
        <html>
            <body>
                <div style="display:flex; flex-direction: column; align-items: center;">
                    <div style="width: 500px;">
                        <h1>${name}님 가입을 환영합니다!!!</h1>
                        <hr />
                        <div style="color: red;">이름 : ${name}</div>
                        <div>나이 : ${age} 세</div>
                        <div>학교 : ${school}</div>
                        <div>가입일 : ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `
    return mytemplate;
}

export function checkValidationEmail(email){
    let check1, check2;

    if(email === undefined || email === null) check1 = false;
    else check1 = true;
    
    if(!check1){
        console.log("이메일 값이 입력되지 않았습니다. 다시 입력해주세요");
        return false;
    }

    const isValid = email.includes('@');
    if(!isValid) check2 = false;
    else check2 = true;
    
    if (!check2){
        console.log("이메일 형식이 올바르지 않습니다.");
        return false;
    } else return true;
}

export async function sendWelcomeTemplateToEmail(email, welcomeMail){
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_SENDER = process.env.EMAIL_SENDER

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const response = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: email,
        subject: '[Bans Inc.]가입을 축하합니다',
        html: welcomeMail
    });

    console.log(response);
    
    // console.log('메일주소 '+email+ ' 에게 환영 메시지를 전송했습니다!');
    // console.log(`전송내역 :
    // ${welcomeMail}`);
}