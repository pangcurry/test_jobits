const router = require('express')();
const controller = require('./controller');
const authMiddleware = require('../../middlewares/auth').authVerify; //test

router.get('/', controller.pong);

module.exports = router;
