export function checkRegNumValidation(regNum){
    const isValid = regNum.includes('-');
    if(!isValid){
        console.log('에러 발생!!! 주민번호 형식이 올바르지 않습니다!!!');
        return false;
    } else {
        return true;
    }
}

export function checkRegNumLength(regNum){
    let splitNums = regNum.split('-');
    if(splitNums[0].length !== 6 || splitNums[1].length !== 7){
        console.log('에러 발생!!! 주민번호 개수를 제대로 입력해 주세요!!!');
        return false;
    } else {
        return true;
    }
}

export function checkPhoneLength(phone){
    let splitNums = phone.split('-');
    if(splitNums[0].length !== 3 || splitNums[1].length !== 4 || splitNums[2].length !==4){
        console.log('에러 발생!!! 휴대폰 번호 개수를 제대로 입력해 주세요!!!');
        return false;
    } else {
        return true;
    }
}

export function checkEmailValidation(email){
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