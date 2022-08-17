import express from "express";
const app = express();

// 주식 가격 조회하기
app.get("/stocks", function (req, res) {
  res.send("주식가격을 조회합니다.");
});

// 주식 최대 가격 조회하기
app.get("/stocks/max", function (req, res) {
  res.send("주식의 최대 가격 정보를 조회합니다.");
});

// 신규 주식 등록하기
app.post("/stocks", function (req, res) {
  res.send("신규 주식을 등록합니다.");
});

app.listen(3002);
