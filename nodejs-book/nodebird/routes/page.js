const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 사용자 정보에 접근 가능하도록 함
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

// isAuthenicated() 에 따라서 호출 (미들웨어 활용)
router.get('/profile', isLoggedIn, renderProfile);  
router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

module.exports = router;