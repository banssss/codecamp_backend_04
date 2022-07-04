function createTokenOfPhone(myphone){
    // 1. 폰 번호 자릿수 맞는지 확인하기
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('error detected! 폰 번호를 제대로 입력해 주세요!');
        return;
    }

    // 2. 폰 토큰 6자리 만들기
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6,'0');
    console.log(result);

    // 3. 폰 번호에 토큰 전송하기
    console.log(myphone + " 번호로 인증번호 " + result + " 전송합니다.");
    
}

createTokenOfPhone('01012345678');