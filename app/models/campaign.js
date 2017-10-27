var mongoose = require('mongoose');
var db = require('./../config/dbConfig');
var Users = require('./user.js');

var campaignSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  beginningDate : {
    type : Date,
    required : true
  },
  creator : [{type : mongoose.Schema.Types.ObjectId, ref : 'Users'}]
},{collection : 'Campaigns'});

module.exports = db.model("Campaigns", campaignSchema);
