var express = require('express');
var router = express.Router();
var addUser = require('./../app/controller/addUserController');

router.post('/adduser', addUser.addUserCreate);

module.exports = router;
