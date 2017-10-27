var mongoose = require('mongoose');
var db = require('./../config/dbConfig');
var Campaigns = require('./campaign.js');

var userSchema = mongoose.Schema({
   companyname: {
     type: String,
     required: true
   },
	 email: {
     type: String,
     required: true
   },
   password: {
     type: String,
     required: true,
     select: false,
     minlength: 5
   },   
   token: {
     type: String
   }
},{collection : 'Users'});

module.exports = db.model("Users", userSchema);
