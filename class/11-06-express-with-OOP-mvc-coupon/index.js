import express from "express";
import { BoardController } from "./mvc/controllers/board.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";

const app = express();
app.use(express.json());

// 게시판 API
const boardController = new BoardController();
app.get('/boards', boardController.fetchBoards); // 게시글 조회하기
app.post('/boards', boardController.createBoard); // 게시글 등록하기

// 상품 API
const productController = new ProductController();
app.post('/products/buy', productController.buyProduct); // 상품 구매 API
app.post('/products/refund', productController.refundProduct); // 상품 환불 API

// 쿠폰(상품권) API
const couponController = new CouponController();
app.post('/coupons/buy', couponController.buyCoupon); // 쿠폰(상품권) 구매하기 API

app.listen(3000)