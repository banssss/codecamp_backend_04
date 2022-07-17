import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { addDashToPhone } from "./utils.js";
import { scrapOgData } from "./scraping.js";
import { Starbucks } from "./models/starbucks.model.js";
import { options } from './swagger/config.js'
import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";

import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// 회원 가입 API : POST /user
app.post('/user', async (req, res) => {
    // 1. 입력받은 데이터들을 user 변수 안에 객체로 선언
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        personal: req.body.personal,
        prefer: req.body.prefer,
        pwd: req.body.pwd,
        phone: req.body.phone
    });

    // 2. 입력받은 번호로 Tokens 문서를 검색해 해당 번호의 isAuth 확인
    const dataPhone = await Token.findOne({ phone:user.phone });
    
    // 2-1. 번호가 없거나, isAuth가 false 라면, 클라이언트에 422 상태코드와 함께 에러 문구 반환
    if(dataPhone === null || !dataPhone.isAuth){
        res.status(422).send("입력하신 번호는 인증되지 않았습니다. 번호 인증 절차를 다시 진행해주세요.");
        return;
    }

    // 3. User data DB에 저장하기
    // 3-1. '좋아하는 사이트' 로 입력받은 사이트의 OG 태그 정보를 og 객체에 저장
    const ogResult = await scrapOgData(user.prefer);
    user.og.title = ogResult['og:title'];
    user.og.description = ogResult['og:description'];
    user.og.image = ogResult['og:image'];
    
    // 3-2. 'personal' 데이터 뒷자리 치환 후 유저 데이터 저장
    user.personal = user.personal.substring(0,7).padEnd(14,'*');
    await user.save();

    // 4. 가입 완료 정보 전송
    // 4-1. 회원 가입 환영 이메일 전송하기
    // 4-1-1. email 정상인지 확인하기 (1-존재여부, 2-'@'포함여부)
    const isVaild = checkValidationEmail(user.email);
    if(!isVaild){
        res.send('이메일 형식이 잘못되었습니다.');
        return;
    }
    // 4-1-2. 가입환영 Template 만들기
    const welcomeEmail = getWelcomeTemplate(user.name, user.phone, user.prefer);
    // 4-1-3. Email에 가입환영 Template 전송하기
    sendWelcomeTemplateToEmail(user.email, welcomeEmail);

    // 4-2. 생성된 User의 _id를 클라이언트에 반환
    const savedUser = await User.findOne({ phone:user.phone });
    res.send(savedUser._id);
});

// 회원 목록 조회 API : GET /users
app.get('/users', async (req, res)=>{
    // 1. 저장된 User 데이터의 목록을 응답으로 전송
    const result = await User.find();

    // 2. 꺼내온 결과 응답 주기
    res.send(result);
});

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
        sendTokenToSMS(myPhone, myToken);
        res.send(
            // addDashToPhone(token.phone)+'으로 인증 문자가 전송되었습니다.'
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
        sendTokenToSMS(myPhone, myToken);
        res.send(
            // addDashToPhone(result.phone)+'으로 인증 문자가 전송되었습니다.'
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