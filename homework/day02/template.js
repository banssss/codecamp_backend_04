import { checkEmailValidation, checkPhoneLength, checkRegNumLength, checkRegNumValidation } from './check-validation.js';
import { welcomeTemplate, replacedRegnum } from './generate-template.js';

function printTemplate(user){
    // 1. 이메일 검증 (빈값검증, '@'검증)
    const isEmailValid = checkEmailValidation(user.email);
    if(!isEmailValid){return;}
    // 2. 주민등록번호 검증 및 뒷자리 치환(자릿수 및 '-' 검증)
    const isRegnumValid = checkRegNumValidation(user.regNum) && checkRegNumLength(regNum);
    if(!isRegnumValid){return;}
    // 3. 휴대폰 번호 검증 (자릿수 검증)
    const isPhoneValid = checkPhoneLength(user.phone);
    if(!isPhoneValid){return;}
    // 4. 검증된 내용들 html 태그에 넣어 출력
    const replacedNum = replacedRegnum(user.regNum);
    const result = welcomeTemplate(user.name, user.email, replacedNum, user.phone, user.favoriteSite);
    console.log(result);
}

//입력받을 내용 선언
const name = 'David Kim';
const email = 'testmail@mail.com';
const regNum = '912345-1234567';
const phone = '010-1234-5678';
const favoriteSite = 'https://codebootcamp.co.kr/';

printTemplate({name, email, regNum, phone, favoriteSite});

