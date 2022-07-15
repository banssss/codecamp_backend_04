// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  // 1. 핸드폰 번호 추출하기
  const pn1 = document.getElementById('PhoneNumber01').value;
  const pn2 = document.getElementById('PhoneNumber02').value;
  const pn3 = document.getElementById('PhoneNumber03').value;

  const phone = pn1+pn2+pn3;

  // 2. 인증토큰 휴대폰에 전송하기
  axios.post('http://localhost:3000/tokens/phone', {
    phone
  })
  .then((res) => {
    // 성공 핸들링
    console.log(res);
  }).catch(function (error) {
    // 실패 시 에러코드 콘솔 출력
    console.log(error);
  });
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  // 핸드폰 번호, token 추출하기
  const pn1 = document.getElementById('PhoneNumber01').value;
  const pn2 = document.getElementById('PhoneNumber02').value;
  const pn3 = document.getElementById('PhoneNumber03').value;
  const phone = pn1+pn2+pn3;
  const token = document.getElementById('TokenInput').value;

  axios.patch('http://localhost:3000/tokens/phone', {
    phone,
    token
  })
  .then((res)=>{
    console.log('핸드폰 인증 완료')
    console.log(res)
  }).catch(function (error) {
    // 실패 시 에러코드 콘솔 출력
    console.log(error);
  });
}

// 회원 가입 API 요청
const submitSignup = async () => {
  // 입력받은 정보들 추출하기
  const name = document.getElementById('SignupName').value;
  const pnl1 = document.getElementById('SignupPersonal1').value;
  const pnl2 = document.getElementById('SignupPersonal2').value;
  const personal = pnl1+"-"+pnl2;
  const prefer = document.getElementById('SignupPrefer').value;
  const email = document.getElementById('SignupEmail').value;
  const pwd = document.getElementById('SignupPwd').value;
  const pn1 = document.getElementById('PhoneNumber01').value;
  const pn2 = document.getElementById('PhoneNumber02').value;
  const pn3 = document.getElementById('PhoneNumber03').value;
  const phone = pn1+pn2+pn3;
  const token = document.getElementById('TokenInput').value;
  
  axios.post('http://localhost:3000/user', {
    name,
    personal,
    phone,
    token,
    prefer,
    email,
    pwd
  })
  .then((res) => {
      // 성공 핸들링
      console.log(res)
  }).catch(function (error) {
    // 실패 시 에러코드 콘솔 출력
    console.log(error);
  });
  console.log('회원 가입 완료')
}
