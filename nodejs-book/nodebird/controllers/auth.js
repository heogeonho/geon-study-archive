const bcrypt = require('bcrypt'); // 암호화 및 해싱 기능 제공
const passport = require('passport'); // 사용자 인증 및 권한 부여 관리
const User = require('../models/user');

// 회원가입 컨트롤러
exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } }); // 기존 가입 유저 확인
        if (exUser) {
            // 기존 가입 유저 있으면 회원가입 페이지로 redirect
            // 쿼리 파라미터 이용해 클라이언트에서 처리하도록 작성
            return res.redirect('/join?error=exist'); 
        }
        const hash = await bcrypt.hash(password, 12); // 비밀번호 암호화 (12 이상 추천)
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {   // passport 메서드 : 콜백함수를 인수로 받음. 세션 종료 진행 & 콜백함수 실행
        res.redirect('/');
    });
};