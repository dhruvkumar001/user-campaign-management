var User = require('./../models/user');
var helpers = require('./../helpers/getDetails');

exports.userLoggedIn = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) => {
      if (err)
        console.log(err);
      req.userData = user;
      //console.log(user);
      res.redirect('/profile');
    });
  }
  else{
    next();
  }
}

exports.assignUser = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        req.userData = user;
        next();
      });
  }
  else{
    res.redirect('/login');
  }
}

/*exports.isManager = function(req, res, next){
  var token = req.header('auth-token');
  helpers.getUserByToken(token).then((user) => {
    if(user.role === 'manager')
      next()
    else
      res.status(400).json(err)
  }).catch(err => {res.status(400).json(err);});
}*/
