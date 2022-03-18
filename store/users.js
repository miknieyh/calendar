// signUp({commit, state}, payload)
// {
//   //console.log(this.$axios); // 서버요청 테스트 ($axios 사용할 수 있는 이유? nuxt.config.js에서 modules에 추가해줫음
//   //this.$axios.post('/user');//app.js에 있는 rest api post랑 같아야함
//
//   //front serer : 3000 / backend server : 4000
//   this.$axios.post('http://localhost:4000/user', {
//     //body에다 형식이 없는 data들 넣어서 서버로 보내주기
//     //hearder 에는 정해진 데이터만 넣어서 서버로 보내주기
//     //json 구조로 보냄
//     email: payload.email,
//     nickname: payload.nickname,
//     password: payload.password,
//   })
//   commit('setMe',payload);
// }
