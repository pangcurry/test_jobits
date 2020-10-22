const router = require('express')();
const controller = require('./controller');
const auth = require('../../middlewares/auth').authVerify;
const isAdmin = require('../../middlewares/auth').isAdmin;


router.get('/:page',auth,controller.list);
router.post('/',auth,isAdmin,controller.write);
router.put('/:id',auth,isAdmin,controller.modify);
router.delete('/:id',auth,isAdmin,controller.drop);

module.exports = router;
