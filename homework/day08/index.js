import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { Token } from "./models/token.model.js";

import cors from 'cors';
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/tokens/phone', async (req, res) => {
    const myphone = req.body.phone;

    // 1. 폰 번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);
    if(!isValid){return;}
    // 2. 폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 폰 번호가 DB에 저장되어 있는지 확인 후 업데이트하기
    const result = await Token.findOne({ phone:myphone });
    // 3-1-1. 폰 번호가 저장되어있지 않다면, 새로 할당하여 DB에 저장하기
    if(result.length === 0){
        const token = new Token({
            token: mytoken,
            phone: req.body.phone,
            isAuth: false
        });
        await token.save();
        // 3-1-2. 폰 번호에 토큰 전송하기
        // sendTokenToSMS(myphone, mytoken);
        res.send(
            token.phone.slice(0,3)+'-'+
            token.phone.slice(3,7)+'-'+
            token.phone.slice(7,11)+'으로 인증 문자가 전송되었습니다.'
        );
    // 3-2-1. 폰 번호가 이미 저장되어있는 중복번호라면, token 업데이트하기
    } else {
        result.token = mytoken;
        await Token.updateOne({phone:myphone}, {$set:{token:mytoken}});
        // 3-2-2. 폰 번호에 토큰 전송하기
        // sendTokenToSMS(myphone, mytoken);
        res.send(
            result.phone.slice(0,3)+'-'+
            result.phone.slice(3,7)+'-'+
            result.phone.slice(7,11)+'으로 인증 문자가 전송되었습니다.'
        );
    }
});

app.patch('/tokens/phone', async (req,res)=>{
    const myphone = req.body.phone;

    // 1. 입력받은 핸드폰 번호를 DB - Tokens 문서에서 찾아오기
    const result = await Token.findOne({ phone:myphone });

    // 1-1. 핸드폰 번호가 저장되어있지 않다면, 클라이언트에 false를 응답하고 함수를 종료하기
    if(result.length === 0){
        res.send(false);
        return;
    }
    // 2. 입력받은 토큰을 DB의 토큰정보와 비교하기.
    const myToken = req.body.token;
    const dbToken = result.token;
    // 2-1. 일치하지 않으면 클라이언트에 false를 응답하고 함수를 종료하기
    if(myToken !== dbToken){
        res.send(false);
        return;
    }
    // 2-2. 일치하면 isAuth를 true로 변경하여 DB에 저장후 클라이언트에 true 응답하기.
    if(myToken === dbToken){
        result.isAuth = true;
        await result.updateOne({phone:myphone}, {$set:{isAuth:true}});
        res.send(true);
    }
});

await mongoose.connect("mongodb://hw-database:27017/myproject04");

app.listen(3000, () => {
    console.log(`HW DB server를 켜는 데 성공했습니다.`);
});