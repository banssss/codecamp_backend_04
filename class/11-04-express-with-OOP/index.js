import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

app.use(express.json());

// 1. 상품 구매 API
app.post('/products/buy', (req, res) => {
    // 1-1. 가진 돈 검증하는 코드 (대략 10줄 => 2줄)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 1-2. 판매 여부 검증하는 코드 (대략 10줄 정도 => 2줄)
    const productService = new ProductService();
    const isSoldOut = productService.checkSoldOut();

    // 1-3. 상품 구매하는 코드
    if(hasMoney && !isSoldOut){
        res.send('상품 구매 완료!!');     
    }

});

// 2. 상품 환불 API
app.post('/products/refund', (req, res) => {
    // 2-1. 판매 여부 검증하는 코드 (대략 10줄 정도 => 2줄)
    const productService = new ProductService();
    const isSoldOut = productService.checkSoldOut();

    // 2-2. 상품 환불하는 코드
    if(isSoldOut){
        res.send('상품 환불 완료!!');
    }

});

// 3. 쿠폰 구매 API
app.post('/coupons/buy', (req, res) => {

});

app.listen(3000)