const axios = require("axios");
const express = require("express");
//cors적용하기
const cors = require('cors')
//db 연동
// const db = require("./models")

const app = express();
//db 실행
// db.sequelize.sync();
//cors 적용
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
})); // cors 안에 front 서버
//json구조로 parsing
app.use(express.json());
//req.body 받아올수 있게해주는 모듈
app.use(express.urlencoded({extended: true}));

app.listen(4000, () => {
  console.log("서버가 연결되었습니다.");
});
