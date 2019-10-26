const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const responseMessage = require('../module/responseMessage');
const statusCode = require('../module/statusCode');
const User = require('../model/user');

/*
  [POST] localhost:3000/users/signin
  request body
  {
      "id" : "아이디",
      "pwd" : "패스워드"
  }
  reponse
  1. 성공
  2. 파라미터 오류
  3. 아이디가 존재하지 않음
  4. 비밀번호가 틀린 경우
  5. 서버 오류 
*/

router.post('/signin', (req, res) => {
  const {id, pwd} = req.body;
  
  // 파라미터 값 체크
  if(!id || !pwd){
    res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }

  User.signin(id,pwd)
      .then(({code, json}) => res.status(code).send(json))
      .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
      });
})

/*
  [POST] localhost:3000/users/signup
  request body
  {
      "id" : "아이디",
      "pwd" : "패스워드",
      "name" : "이름",
      "address" : "주소"
  }

  reponse
  1. 성공
  2. 파라미터 오류
  3. 아이디 중복
  4. 서버 오류
  
*/

router.post('/signup', (req, res) => {
  const { id, pwd, name, address } = req.body;
  
  // 파라미터 값 체크
  if (!id || !pwd || !name || !address) {
    res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }

  User.signup(id,pwd,name,address)
  .then(({code, json})=> res.status(code).send(json))
  .catch((err) => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(authUtil.successFalse(responseMessage.NULL_VALUE));
  })
})


module.exports = router;