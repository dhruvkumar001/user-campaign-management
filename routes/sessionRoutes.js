var express = require('express');
var router = express.Router();
var session = require('./../app/controller/sessionController');


router.post('/login', session.sessionCreate);
// router.get('/logout', session.sessionDestroy);

module.exports = router;
