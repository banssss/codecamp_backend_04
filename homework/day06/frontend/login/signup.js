// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  console.log('인증 번호 전송')

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

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송');

  // 1. 가입 정보 추출하기
  const email = document.getElementById('SignupEmail').value;
  const name = document.getElementById('SignupName').value;
  const phone = document.getElementById('PhoneNumber01').value +
                document.getElementById('PhoneNumber02').value +
                document.getElementById('PhoneNumber03').value;
  const personal = document.getElementById('SignupPersonal').value;
  const prefer = document.getElementById('SignupPrefer').value;
  const pwd = document.getElementById('SignupPwd').value;

  // 2. 가입 축하 메일 보내기
  axios.post('http://localhost:3000/users', {
    email,
    name,
    phone,
    personal,
    prefer
  })
  .then((res) => {
    // 성공 핸들링
    console.log(res);
  }).catch(function (error) {
    // 실패 시 에러코드 콘솔 출력
    console.log(error);
  });
}
