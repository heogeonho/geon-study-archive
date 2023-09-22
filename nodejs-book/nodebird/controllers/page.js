// 화면에 랜더링 하기 위한 코드

exports.renderProfile = (req, res) => {
   res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
   res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = (req, res, next) => {
   const twits = [];
   res.render("main", {
      title: "NodeBird",
      twits,   // 넌적스에 게시글 목록을 전달
   });
};
