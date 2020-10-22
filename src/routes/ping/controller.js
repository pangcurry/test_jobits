const { Users } = require('../../models');

const pong = async (req,res,next) => {
  console.log('pong_pong_pong');
//   Users.create({
//   id: "rgeg",
//   password: "25dcvsdfv"
// });
  let test = await Users.findOne({
    where: {
      id: 'dupang'
    }
  });
  console.log(test);
  res.json({
    data: test,
  });


}

module.exports = {
  pong
};
