const passport = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
   // 카카오 로그인에 대한 설정
   // (clientID: 카카오 발급 아이디, callbackURL: 인증결과 받을 라우터 주소)
   passport.use(
      new kakaoStrategy(
         {
            clientID: process.env.KAKAO_ID,
            callbackURL: "/auth/kakao/callback",
         },

         //기존 카카오 가입 사용자 조회, 있으면 정보와 done 함수 호출 & 전략 종료
         async (accessToken, refreshToken, profile, done) => {
            //console.log('kakao profile', profile);
            try {
               const exUser = await User.findOne({
                  where: { snsId: profile.id, provider: "kakao" },
               });
               if (exUser) {
                  done(null, exUser);
               }
               // 정보 없으면 회원가입 진행
               // 카카오에서 인증 후 callbackURL으로 accessToken, refreshToken, profile 보냄
               // profile의 사용자 정보 받아와 회원가입
               else {
                  const newUser = await User.create({
                     email: profile._json?.kakao_account?.email,
                     nick: profile.displayName,
                     snsId: profile.id,
                     provider: "kakao",
                  });
                  done(null, newUser);
               }
            } catch (error) {
               console.error(error);
               done(error);
            }
         }
      )
   );
};
