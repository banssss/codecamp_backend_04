import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

import { Starbucks } from "./models/starbucks.model.js";
import { Token } from "./models/token.model.js";

import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

import { UserController } from "./controllers/user.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// Users API
const userController = new UserController();
app.post('/user', userController.createUser); // 회원 가입 API
app.get('/users', userController.fetchUsers); // 회원 목록 조회 API

// 토큰 인증 요청 API : POST / tokens/phone
app.post('/tokens/phone', async (req, res) => {
    const myPhone = req.body.phone;

    // 1. 폰 번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myPhone);
    if(!isValid){return;}
    // 2. 폰 토큰 6자리 만들기
    const myToken = getToken();

    // 3. 폰 번호가 DB에 저장되어 있는지 확인 후 업데이트하기
    const result = await Token.findOne({ phone:myPhone });
    // 3-1-1. 폰 번호가 저장되어있지 않다면, 새로 할당하여 DB에 저장하기
    if(result === null){
        const token = new Token({
            token: myToken,
            phone: req.body.phone,
            isAuth: false
        });
        await token.save();
        // 3-1-2. 폰 번호에 토큰 전송하기
        // sendTokenToSMS(myPhone, myToken);
        res.send(
            "핸드폰으로 인증 문자가 전송되었습니다!"
        );
    // 3-2-1. 폰 번호가 이미 저장되어있는 중복번호라면, token 업데이트하기
    } else {
        result.token = myToken;
        await Token.updateOne({phone:myPhone}, {$set:{token:myToken}});
        // 3-2-2. 폰 번호가 이미 가입되어있는 번호라면, 에러 메시지 출력하기.
        if(result.isAuth){
            res.status(422).send("이미 가입되어있는 번호입니다.")
            return;
        }
        // 3-2-3. 폰 번호에 토큰 전송하기
        // sendTokenToSMS(myPhone, myToken);
        res.send(
            "핸드폰으로 인증 문자가 전송되었습니다!"
        );
    }
});

// 인증 완료 API : PATCH /tokens/phone
app.patch('/tokens/phone', async (req,res)=>{
    const myPhone = req.body.phone;

    // 1. 입력받은 핸드폰 번호를 DB - Tokens 문서에서 찾아오기
    const result = await Token.findOne({ phone:myPhone });

    // 1-1. 핸드폰 번호가 저장되어있지 않다면, 클라이언트에 false를 응답하고 함수를 종료하기
    if(result === null){
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
        await Token.updateOne({phone:myPhone}, {isAuth:true});
        // await result.updateOne({phone:myPhone}, {isAuth:true});
        // result.isAuth = true;
        // await result.save();
        res.send(true);
    }
});

// 스타벅스 커피 목록 조회 API : GET/starbucks
app.get('/starbucks', async (req, res)=>{
    // 1. 저장된 Starbucks 데이터의 목록을 응답으로 전송
    const result = await Starbucks.find();

    // 2. 꺼내온 결과 응답 주기
    res.send(result);
});

await mongoose.connect("mongodb://miniproject-database:27017/miniproject");

app.listen(3000, () => {
    console.log(`Mini-Project DB server를 켜는 데 성공했습니다.`);
});