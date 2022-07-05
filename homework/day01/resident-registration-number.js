import { checkValidation, checkLength } from './num-check.js';
import { printReplaced } from './print-replaced.js';

function customRegistrationNumber(regNum){
    // 1. 주민번호 가운데 ' - ' 들어가 있는지 판단하기.
    const isValid = checkValidation(regNum);
    if(!isValid){return;}
    // 2. 주민번호 앞이 6자리, 뒤가 7자리인지 판단하기.
    const lengthValid = checkLength(regNum);
    if(!lengthValid){return;}
    // 3. 뒤 7자리 중 끝 6자리를 * 로 변경하여 출력하기.
    printReplaced(regNum);
    // 함수에 퍼사드 패턴 적용하기
}

customRegistrationNumber('210510-1010101');
customRegistrationNumber('210510-1010101010101');
customRegistrationNumber('2105101010101');