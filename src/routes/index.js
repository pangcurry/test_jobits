const router = require('express')();
const employment = require('./employment');
const login = require('./login');
const ping = require('./ping');

router.use('/employment', employment);
router.use('/login', login);
router.use('/ping', ping); //test

module.exports = router;
