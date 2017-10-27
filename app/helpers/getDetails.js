var User = require('./../models/user');
var Campaign = require('./../models/campaign');
const bcrypt = require('bcrypt');

exports.getIdByEmail = function(email){
  return new Promise((resolve, reject) => {
    User.find({'email': email}, function(err, user){
      if (err) {
        console.log(err);
        return reject(err);
      }
      if(user.length){
        var a = user[0]._id;
        return resolve(a);
      }
      else
        console.log(email +  " is not registered");
    });
  })
}


exports.getUserByToken = function(token){
  return new Promise((resolve, reject) => {
    User.findOne({'token': token}, function(err, user){
      if (err) return reject(err);
      if (user == undefined){
        return reject("Invalid Access!");
      }
      else{
        return resolve(user);
      }
    });
  })
}

exports.getCampaignsByEmail = function(email){
  return new Promise((resolve, reject) => {
    User.findOne({'email' : email}, {'_id': 0}).populate('campaign').exec(function(err,result){
      if (err) return reject(err);
      if (result == undefined){
        return reject("Invalid Access!");
      }
      else{
        return resolve(result.campaign);
      }
    });
  })
}

exports.validateUser = function(email, pass){
  return new Promise((resolve, reject) => {
    User.find({'email': email},'+password', function(err, user){
      if(user[0]){
        bcrypt.compare(pass, user[0].password, function (err, result) {
          if(err){
            return reject(err);
          }
          if (result === true) {
            return resolve(result);
          }
          else{
            return reject("Please provide valid login credentials");
          }
        });
      }
      else{
        return reject("User not found! Please provide valid login credentials");
      }
    });

  })
}
