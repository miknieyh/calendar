
const express = require("express");
const axios = require("axios");
const {request} = require("express");
const app = express();
const cors = require('cors')
//db 연동
const db = require("./models")
//db 실행
db.sequelize.sync();
//cors 적용
let corsOptions = {
  origin:'http://localhost:3000',
  credentials:true
}
app.use(cors(corsOptions)); // cors 안에 front 서버
const url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?";
const api_key_decode = "ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D";
const currentPut = async () => {
  let response;
  let params = {
    "ServiceKey": api_key_decode,
    "solYear":2022,
  }
  try {
    response = await axios.get("http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=2022&ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D");
  } catch (e) {
    console.log(e);
  }
  return response;
};

app.get("/", (req, res) => {
  currentPut().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data.response.body);
  });
}); //node서버에서 프론트서버로 데이터를 보내기 위한 코드

app.listen(4000, () => {
  console.log("서버가 연결되었습니다.");
});
