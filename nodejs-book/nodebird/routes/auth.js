const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require( '../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
// 접근 시 카카오 로그인 과정 시작
router.get('/kakao', passport.authenticate('kakao'));

//GET /auth/kakao/callback
// 카카오 로그인은 성공 시 내부적으로 req.login을 호출함
// 메서드에 직접 콜백 x, 대신 실패 성공 시 어디로 이동할 것인지 할당
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
 }), (req, res) => {
    res.redirect('/');
 });

module.exports = router;