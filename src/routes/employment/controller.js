const { Employment } = require('../../models');
const Employments = require('../../services/employment');

const employment = new Employments(Employment);
const MAX_LIMIT = 6;

const list = async (req,res,next) => {
  const page = parseInt(req.params.page);
  try {
    const lists = await employment.getEmploymentList(page,MAX_LIMIT);
    res.status(200).json({ lists:lists });// list 가져오기 성공
  }
  catch(err) {
    res.status(err.status).send({
      message: err.message
    })// list 가져오기 안됨
  }
}

const write = async (req,res,next) => {

  const { question,answer } = req.body;
  try {
    await employment.write(question, answer);
    res.status(200).end();//등록성공

  } catch (err) {
    res.status(err.status).send({
      message: err.message
    });// 등록 안됨
  }
}

const modify = async (req,res,next) => {
  const { question,answer } = req.body;
  const id = parseInt(req.params.id);
  try {
    await employment.modify(id,question,answer);
    res.status(200).end();// 수정 성공
  } catch (err) {
    res.status(err.status).send({
      message: err.message
    });// 수정 안됨
  }
}

const drop = async (req,res,next) => {
  const id = parseInt(req.params.id);
  try {
    await employment.drop(id);
    res.status(200).end();//삭제 성공
  } catch (err) {
    res.status(err.status).send({
      message: err.message
    });//삭제 실패
  }
}

module.exports = {
  list,
  write,
  modify,
  drop,
};
