var User = require('./../models/user');

exports.user = function(req, res, next){
  var token = req.header('auth-token');
  // if(token === undefined) return res.status(400).json("Invalid Access! Token kahan he?");
  User.findOne({'token': token}, function(err, user){
    if (err) res.status(400).json(err + " Token kahan he?")
    if (user == undefined) res.status(400).json("Invalid Access! Token is not available?");
    else next();
  });
}
