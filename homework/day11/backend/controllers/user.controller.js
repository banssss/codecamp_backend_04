import { EmailService } from "./services/email.js";
import { ScrapingService } from "./services/scraping.js";
import { Token } from "../models/token.model.js";
import { User } from "../models/user.model.js";

export class UserController {
    createUser = async (req, res) => {
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
        const scrapingService = new ScrapingService();
        const ogResult = await scrapingService.scrapOgData(user.prefer);
        user.og.title = ogResult['og:title'];
        user.og.description = ogResult['og:description'];
        user.og.image = ogResult['og:image'];
        
        // 3-2. 'personal' 데이터 뒷자리 치환 후 유저 데이터 저장
        user.personal = user.personal.substring(0,7).padEnd(14,'*');
        await user.save();
    
        // 4. 가입 완료 정보 전송
        // 4-1. 회원 가입 환영 이메일 전송하기
        // EmailService() 선언
        const emailService = new EmailService();
        // 4-1-1. email 정상인지 확인하기 (1-존재여부, 2-'@'포함여부)
        const isVaild = emailService.checkValidationEmail(user.email);
        if(!isVaild){
            res.send('이메일 형식이 잘못되었습니다.');
            return;
        }
        // 4-1-2. 가입환영 Template 만들기
        const welcomeEmail = emailService.getWelcomeTemplate(user.name, user.phone, user.prefer);
        // 4-1-3. Email에 가입환영 Template 전송하기
        emailService.sendWelcomeTemplateToEmail(user.email, welcomeEmail);
    
        // 4-2. 생성된 User의 _id를 클라이언트에 반환
        const savedUser = await User.findOne({ phone:user.phone });
        res.send(savedUser._id);
    }

    fetchUsers = async (req, res)=>{
        // 1. 저장된 User 데이터의 목록을 응답으로 전송
        const result = await User.find();
    
        // 2. 꺼내온 결과 응답 주기
        res.send(result);
    }
}