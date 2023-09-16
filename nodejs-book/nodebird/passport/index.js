const passport = require('passport');
const local = require('/localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {    // 로그인 사용자 정보
      done(null, user.id);                      // user.id 저장하고 싶은 데이터
    });
  
    passport.deserializeUser((id, done) => {    // 세션에 저장된 사용자 -> 정보 조회 후 req.user 에 저장
      User.findOne({ where: { id } })           // sequelize를 사용하여 사용자 정보 조회
        .then(user => done(null, user))
        .catch(err => done(err));
    });
  
    local();
    kakao();
  };