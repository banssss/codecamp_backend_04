import express from "express";
import { ProductController } from "./mvc/controllers/product.controller";

const app = express();

// 상품 API
const productController = new ProductController();
app.post('/products/buy', productController.buyProduct); // 상품 구매 API
app.post('/products/refund', productController.refundProduct); // 상품 환불 API

// 3. 쿠폰 구매 API
app.post('/coupons/buy', (req, res) => {

});

app.listen(3000)