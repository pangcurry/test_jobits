const jwt = require('jsonwebtoken');

const authVerify = async (req,res,next) => {
  console.log("in authVerify");
  const bearerHeader = req.headers['authorization'];
  if(!bearerHeader) { res.status(400).end(); }// 토큰 없음
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  try {
    // if(!token) {
    //   res.status(403).end(); //로그인 안되어있음.
    // }
    await jwt.verify(token,req.app.get('jwt-secret'),(err,decoded) => {
      if(err) throw new Error(err.message);
      req.decoded = decoded;
      next();
    })
  } catch(err) {
    res.status(403).end();  // 로그인 실패
  }
}

const isAdmin = (req,res,next) => {
  console.log("in is Admin");
  if(!(req.decoded.id === 'Admin')) {
    res.status(400).json({ message: 'no permission'}); // 메세지 지우기
  }
  else next();

}


module.exports = {
  authVerify,
  isAdmin,
};
