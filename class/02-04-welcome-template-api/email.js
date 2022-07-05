import { getToday } from "./utils.js";

export function getWelcomeTemplate(name, age, school) {
    const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>나이 : ${age} 세</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${getToday()}</div>
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

export function sendWelcomeTemplateToEmail(email, welcomeMail){
    console.log('메일주소 '+email+ ' 에게 환영 메시지를 전송했습니다!');
    console.log(`전송내역 :
    ${welcomeMail}`);
}