const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const error = require('../errors');

class loginService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async isMember(id) {
    if(typeof id !== 'string' || id.length < 1 || id === '') {
      throw error.badRequest;
    }
    const user = await this.usersModel.findOne({
      where: { id }
    });
    if(user === null) {
      throw error.notFound;
    }
    return user.password;
  }
  async doesItMatch(received_pwd,existing_pwd,cryptoSecret) {
    if(typeof received_pwd !== 'string' || received_pwd === '') {
      throw error.badRequest;
    }
    const decode = crypto.createDecipher('aes-256-cbc',cryptoSecret);
    let decodeResult = decode.update(existing_pwd,'base64','utf8')
                       + decode.final('utf8');// 요청받은 비번 해독
    if(decodeResult === received_pwd) {
      return;
    } else {
      throw error.unauthorized; // 비밀번호 맞지 않음.
    }
  }
  async tokenIssue(id,jwtSecret) {

    try {
      const accessToken = await jwt.sign({  //accessToken 발급
        id
      }, jwtSecret, {
        expiresIn: '15m'
      });
      return accessToken;
    } catch(err) {
      res.status(err.status).send({ //토큰 못만듬
        message: err.message
      });
    }
  }
  async createPassword(id,newPassword,cryptoSecret) {
    if(typeof newPassword !== 'string' || newPassword === '') {
      throw error.badRequest;
    }
    const cipher = crypto.createCipher('aes-256-cbc', cryptoSecret);
    let password = cipher.update(newPassword, 'utf8', 'base64') //새로운 비번 암호화
                 + cipher.final('base64');
    await this.usersModel.update({
      password
    },{
      where: { id }
    });
    return;
  }

}

module.exports = loginService;
