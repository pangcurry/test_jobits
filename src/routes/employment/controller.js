const { Employment } = require('../../models');

const list = async (req,res,next) => {
  let result = [];
  const { page } = req.params;
  try {
    const list = await Employment.findAll({
      attributes: ['id','question','answer'],
      order: [['createdAt','asc']],
      limit: 10,
      offset: (page-1)*10,
    });

    res.status(200).json({  // list 가져오기 성공
      lists: list
    });
  }
  catch(err) {
    console.log(err.message);
    res.status(500).end();// list 가져오기 안됨
  }
}

const write = async (req,res,next) => {
  console.log("in write");
  const { question,answer } = req.body;
  try {
    console.log("try in");
    await Employment.create({
      question,
      answer,
    });
    res.status(200).end();//등록성공

  } catch (err) {
    res.status(500).end();// 등록 안됨
  }
}

const modify = async (req,res,next) => {
  const { question,answer } = req.body;
  const { id } = req.params;
  try {
    await Employment.update({
      question,
      answer
    },{
      where: { id }
    });
    res.status(200).end();// 수정 성공
  } catch (err) {
    res.status(500).end();// 수정 안됨
  }
}

const drop = async (req,res,next) => {
  const { id } = req.params;
  if(!id) { res.status(400).end(); }
  try {
    const result = await Employment.destroy({
      where: { id }
    });
    res.status(200).end();//삭제 성공
  } catch (err) {
    res.status(500).end();//삭제 실패
  }
}

module.exports = {
  list,
  write,
  modify,
  drop,
};
