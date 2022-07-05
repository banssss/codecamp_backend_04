export function checkValidation(regNum){
    const isValid = regNum.includes('-');
    if(!isValid){
        console.log('에러 발생!!! 형식이 올바르지 않습니다!!!');
        return false;
    } else {
        return true;
    }
}

export function checkLength(regNum){
    let splitNums = regNum.split('-');
    if(splitNums[0].length !== 6 || splitNums[1].length !== 7){
        console.log('에러 발생!!! 개수를 제대로 입력해 주세요!!!');
        return false;
    } else {
        return true;
    }
}