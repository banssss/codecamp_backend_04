// const express = require('express')
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";
import { options } from "./swagger/config.js";
import { Board } from "./models/board.model.js";
import { Stock } from "./models/stock.model.js";

import cors from "cors";
import express from "express";
import mongoose from "mongoose"
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/boards', async (req, res) => { 
  // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   { number: 1, writer: "철수", title: "철수입니다.", contents: "철수용이에요@@"},
  //   { number: 2, writer: "영수", title: "영수입니다.", contents: "영수용이에요~~"},
  //   { number: 3, writer: "훈수", title: "훈수입니다.", contents: "훈수용이에요##"},
  // ];
  // const result = await Board.find({writer:"철수"});
  const result = await Board.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
})

app.post('/boards', async (req, res) =>{
  console.log(req.body.writer);
  console.log(req.body.title);
  console.log(req.body.contents);

  // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  });
  await board.save();
  
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

app.post('/users', (req, res) => {
  const user = req.body.myuser;

  // 1. email 정상인지 확인하기 (1-존재여부, 2-'@'포함여부)
  const isVaild = checkValidationEmail(user.email);
  if(!isVaild) return;
  // 2. 가입환영 Template 만들기
  const welcomeEmail = getWelcomeTemplate(user.name, user.age, user.school);
  // 3. Email에 가입환영 Template 전송하기
  sendWelcomeTemplateToEmail(user.email, welcomeEmail);
  res.send("가입이 완료되었습니다.");
});

app.get("/stocks", async (req,res) => {
  const stocks = await Stock.find();
  res.send(stocks);
})

// mongoDB 접속!!
await mongoose.connect("mongodb://my-database:27017/mydocker04");

// Backend API Server OPEN!!
app.listen(3000, () => {
  console.log(`프로그램을 켜는 데 성공했습니다.`);
});