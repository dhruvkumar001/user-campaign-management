var User = require('./../models/user');
var Campaign = require('./../models/campaign');

exports.profile = function(req, res){
  var user = req.userData;
  User.findOne({'email' : user.email}, {'_id': 0}).populate('campaign').exec(function(err,result){
  	if (err) res.render('show_message', {message: err});
  	else if (result == undefined){
  		res.render('show_message', {message: "Invalid Access!"});
  	}
    else{
        res.render('profile', {email: result.email, result: result.campaign});
    }
  });
};
