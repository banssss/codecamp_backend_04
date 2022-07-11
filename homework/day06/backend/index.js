import { options } from "./swagger/config.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";

import cors from 'cors';
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/users', (req, res) => { 
  // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
  const result = [
    {
        email : "johndoe@gmail.com", 
        name : "John Doe",
        phone : "010-9999-9999",
        personal : "999999-1111111",
        prefer : "https://johnisthebest.com"
    },
    {
        email : "janedoe@gmail.com", 
        name : "Jane Doe",
        phone : "010-8888-8888",
        personal : "888888-2222222",
        prefer : "https://janeisthemost.com"
    },
    {
        email : "gildonghong@gmail.com", 
        name : "Gildong Hong",
        phone : "010-7777-7777",
        personal : "112233-3333333",
        prefer : "https://hwalbindang.com"
    },
    {
        email : "sejong@ziphyunjeon.com", 
        name : "Doe Lee",
        phone : "010-6666-6666",
        personal : "111111-4444444",
        prefer : "https://ziphyunjeon.com"
    },
    {
        email : "youngsil@ziphyunjeon.com", 
        name : "YS Jang",
        phone : "010-5555-5555",
        personal : "222222-5555555",
        prefer : "https://ziphyunjeon.com"
    }
  ];
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.get('/starbucks', (req, res) => { 
    // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
  const result = [
    { name: "나이트로 바닐라 크림", kcal: 80},
    { name: "나이트로 콜드 브루", kcal: 5},
    { name: "돌체 콜드 브루", kcal: 265},
    { name: "바닐라 크림 콜드 브루", kcal: 125},
    { name: "벨벳 다크 모카 나이트로", kcal: 150},
    { name: "시그니처 더 블랙 콜드 브루", kcal: 25},
    { name: "제주 비자림 콜드 브루", kcal: 340},
    { name: "그냥 콜드 브루", kcal: 5},
    { name: "콜드 브루 몰트", kcal: 505},
    { name: "살안찌는 돌체 콜드 브루", kcal: 1},
  ];
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
  
});

app.post('/tokens/phone', (req, res) => {
  const myphone = req.body.phone;
  
  // 1. 폰 번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if(!isValid){return;}

  // 2. 폰 토큰 6자리 만들기
  const mytoken = getToken();

  // 3. 폰 번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);
  res.send("인증이 완료되었습니다.");
});

app.post('/users', (req, res) => {
  const user = {
   email : req.body.email,
   name : req.body.name,
   phone : req.body.phone,
   personal : req.body.personal,
   prefer : req.body.prefer
  }
  // 1. email 정상인지 확인하기 (1-존재여부, 2-'@'포함여부)
  const isVaild = checkValidationEmail(user.email);
  if(!isVaild) return;
  // 2. 가입환영 Template 만들기
  const welcomeEmail = getWelcomeTemplate(user.name, user.phone, user.prefer);
  // 3. Email에 가입환영 Template 전송하기
  sendWelcomeTemplateToEmail(user.email, welcomeEmail);
  res.send("가입이 완료되었습니다.");
});


app.listen(3000, () => {
  console.log(`프로그램을 켜는 데 성공했습니다.`);
});