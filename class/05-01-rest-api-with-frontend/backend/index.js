// const express = require('express')
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { options } from "./swagger/config.js";

import cors from 'cors';
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.get('/boards', (req, res) => { 
  // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, writer: "철수", title: "철수입니다.", contents: "철수용이에요@@"},
    { number: 2, writer: "영수", title: "영수입니다.", contents: "영수용이에요~~"},
    { number: 3, writer: "훈수", title: "훈수입니다.", contents: "훈수용이에요##"},
  ];
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
})

app.post('/boards', (req, res) =>{
  console.log(req.body.writer);
  console.log(req.body.title);
  console.log(req.body.contents);
  // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기
  
  // 2. 저장 결과 응답 주기
  res.send('게시물 등록에 성공하였습니다.');
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

app.listen(3000, () => {
  console.log(`프로그램을 켜는 데 성공했습니다.`);
});