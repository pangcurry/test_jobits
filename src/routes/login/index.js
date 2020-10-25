const router = require('express')();
const controller = require('./controller');
const auth = require('../../middlewares/auth').authVerify;

router.post('/',controller.login);
//router.post('/refresh',auth, controller.refresh);
router.put('/password',auth, controller.password);

module.exports = router;
