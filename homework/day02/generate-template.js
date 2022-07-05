export function welcomeTemplate(name, email, regNum, phone, favoriteSite){
    const result = `
    <html>
        <body>
            <h1>${name}님, 가입을 환영합니다.</h1>
            <hr />
            <div>이메일 : ${email}</div>
            <div>주민번호 : ${regNum}</div>
            <div>휴대폰 번호 : ${phone}</div>
            <div>내가 좋아하는 사이트 : ${favoriteSite}</div>
        </body>
    </html>
    `;
    return result;
}

export function replacedRegnum(regNum){
    let splitNums = regNum.split('-');
    splitNums[1] = splitNums[1].substr(0,1)+'******';
    return splitNums[0] + '-' + splitNums[1];
}