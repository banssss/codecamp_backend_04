import { getWelcomeTemplate, checkValidationEmail, sendWelcomeTemplateToEmail } from './email.js';

function createUser(user){
    // 1. email 정상인지 확인하기 (1-존재여부, 2-'@'포함여부)
    const isVaild = checkValidationEmail(user.email);
    if(!isVaild) return;
    // 2. 가입환영 Template 만들기
    const welcomeEmail = getWelcomeTemplate(user.name, user.age, user.school, user.createdAt);
    // 3. Email에 가입환영 Template 전송하기
    sendWelcomeTemplateToEmail(user.email, welcomeEmail);
}

const name = '철수';
const age = 8;
const school = '다람쥐초등학교';
const email = 'cheolsoo@squirrel.com';

createUser({name, age, school, email});