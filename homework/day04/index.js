import { options } from "./swagger/config.js";

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
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
    { name: "맛있으면서 살안찌는 돌체 콜드 브루", kcal: 0},
  ];
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
  
});

app.listen(3000, () => {
  console.log(`프로그램을 켜는 데 성공했습니다.`);
});