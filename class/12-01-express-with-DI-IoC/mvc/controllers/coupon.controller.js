export class CouponController {

    constructor(moneyService){
        this.moneyService = moneyService;
    }

    buyCoupon = (req, res) => {
        // 1. 가진 돈 검증하는 코드 (10줄 정도))
        // const cashService = new CashService();
        const hasMoney = this.moneyService.checkValue();

        // 2. 쿠폰 구매하는 코드
        if(hasMoney){
            res.send("쿠폰 구매가 완료되었습니다!!");
        }
    }
}