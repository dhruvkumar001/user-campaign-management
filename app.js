var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var cors = require('./app/config/corsConfig');
var thePort = process.env.PORT || 3200;


app.use(cors.config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));


var addUser = require('./routes/addUserRoutes');
var session = require('./routes/sessionRoutes');
var profile = require('./routes/profileRoutes');
var campaigns = require('./routes/manageCampaignsRoutes');
var authenticate = require('./app/config/auth');
app.use(validator());
app.use(addUser);
app.use(session);
app.use(authenticate.user);
app.use(profile);
app.use(campaigns);

app.listen(thePort);

module.exports = app; // for testing
