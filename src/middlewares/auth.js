const jwt = require('jsonwebtoken');

const error = require('../errors');

const authVerify = async (req,res,next) => {
  const bearerHeader = req.headers['authorization'];

  try {
    if(!bearerHeader) { throw error.badRequest; }// 토큰 없음
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    await jwt.verify(token,req.app.get('jwt-secret'),(err,decoded) => {
      if(err) throw error.forbidden;
      req.decoded = decoded;
      next();
    })
  } catch(err) {
    res.status(err.status).send({
      message: err.message
    });  // 로그인 실패
  }
}

const isAdmin = (req,res,next) => {
  console.log("in is Admin");
  if(req.decoded.id !== 'Admin') {
    res.status(403).json({ message: 'no permission'}); // 메세지 지우기
  }
  else next();

}

module.exports = {
  authVerify,
  isAdmin,
};
