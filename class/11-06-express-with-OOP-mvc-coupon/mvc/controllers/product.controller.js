import { CashService } from "./services/cash.js";
import { ProductService } from "./services/product.js";

export class ProductController {
    buyProduct = (req, res) => {
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
    }

    refundProduct = (req, res) => {
        // 2-1. 판매 여부 검증하는 코드 (대략 10줄 정도 => 2줄)
        const productService = new ProductService();
        const isSoldOut = productService.checkSoldOut();
    
        // 2-2. 상품 환불하는 코드
        if(isSoldOut){
            res.send('상품 환불 완료!!');
        }
    }
}