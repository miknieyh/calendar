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
app.use(cors('http://localhost:3000')); // cors 안에 front 서버
//json구조로 parsing
app.use(express.json());
//req.body 받아올수 있게해주는 모듈
app.use(express.urlencoded({extended: false}));
console.log("aaaaa");
app.get("/:solYear", (req, res) => {
  console.log("bbbb",req.params.solYear);
  axios.get("https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo", {
    params: {
      solYear: req.params.solYear,
      ServiceKey: "pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D"
    }
  })
    .then(function (response) {
      console.log(response);
      console.log(res.json(response.data.response.body));
      //response
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(response.data.response.body);
    }).catch(function (error) {
    //오류발생시
    console.log("에러");
    res.status(500).send("Server Error");
 });
});


app.listen(4000, () => {
  console.log("서버가 연결되었습니다.");
});
