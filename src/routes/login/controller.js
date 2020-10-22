const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Users } = require('../../models');

const login = async (req,res,next) => {
  console.log("login in");
  const { id, password } = req.body;
  const cryptoSecret = req.app.get('crypto-secret');
  const jwtSecret = req.app.get('jwt-secret');
  const decode = crypto.createDecipher('aes-256-cbc',cryptoSecret);
  try {
    const user = await Users.findOne({ //유저 찾기
      where: {id}
    });
    let decodeResult = decode.update(user.password,'base64','utf8')
                       + decode.final('utf8');// 요청받은 비번 해독
    if(decodeResult === password) { // 비번 비교
      const accessToken = await jwt.sign({  //accessToken 발급
        id: user.id,
      }, jwtSecret, {
        expiresIn: '15m'
      });
      res.status(200).json({  //로그인 성공함
        accessToken,
      });
    }
    else {
      res.status(406);  //비밀번호 틀림
    }
  }
  catch(err) {
    res.status(404);//유저 존재하지 않음.
  }
}
const refresh = async (req,res,next) => {
  const jwtSecret = req.app.get('jwt-secret');
  const { id } = req.decoded;
  try {
    const accessToken = await jwt.sign({
      id,
    }, jwtSecret, {
      expiresIn: '15m'
    });
    res.status(200).json({//재발급 완료
      accessToken,
    })
  }
  catch(err) {
    res.status(500).json({
      message: err.message,
    });
  }

}

const password = async (req,res,next) => {
  const { oldPassword,newPassword } = req.body;
  const { id } = req.decoded;
  const cryptoSecret = req.app.get('crypto-secret');
  const cipher = crypto.createCipher('aes-256-cbc', cryptoSecret);
  const decode = crypto.createDecipher('aes-256-cbc',cryptoSecret);
  try {
    const user = await Users.findOne({ //유저 찾기
      where: { id }
    });
    let decodeResult = decode.update(user.password,'base64','utf8') // 요청받은 비번 해독
                       + decode.final('utf8');
    if(oldPassword === decodeResult) {  //비번비교
      let password = cipher.update(newPassword, 'utf8', 'base64') //새로운 비번 암호화
                   + cipher.final('base64');
      await Users.update({
        password,
      },{
        where: { id }
      });
      res.status(200).end();  //비번 변경 성공
    }
    else {
      res.status(403).json({ // 비밀번호 일치하지 않음 //메세지 지우기
        "message":"Password Mismatch"
      });
    }
  } catch(err) {
    res.status(401).json({  //유저를 찾을 수 없음 //메세지 지우기
      "message":"user를 찾을 수 없음"
    });
  }
}

module.exports = {
  login,
  refresh,
  password,
};
