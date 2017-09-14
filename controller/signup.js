var User = require('./../models/db');
const bcrypt = require('bcrypt');

exports.signupNew = function(req, res){
    res.render('signup', {message: "Signup"});
};

exports.signupCreate =  function(req, res){
  var username = req.body.username;
  var pass = req.body.password;
  var email = req.body.email;

  User.count({ $or:[ {'emailId': email}, {'username': username}]}, function (err, count) {
      if (count === 0) {
        if(!username || !pass || !email){
           res.send("Invalid details!");
        }
        else{
          bcrypt.hash(pass, 10, function (err, hash){
            if (err) {
              console.log(err);
            }
            var newUser = new User({
              username: username,
              emailId: email,
              password: hash
            });
            newUser.save(function(err, user){
              if(err)
                   res.render('signup', {message: "Database error", type: "error"});
                else{
                  res.cookie('loginId', user._id, {httpOnly: true, signed: true, maxAge: 360000});
                  res.redirect('/profile');
                 }
            });
          })
        }
      }
      else{res.render('signup', {message: "Username or email already registered! Signup Again!"});
      }
  });
};
