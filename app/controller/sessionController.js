const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.sessionCreate = function(req, res){
   const email = req.body.username;
   const pass = req.body.password;
   console.log(req);
   console.log(email,"**************",pass);
   if(!email || !pass){
     res.status(401).json({message:"Please enter all the fields"})
    //  res.render('login', {message: "Please enter all the fields"});
   }
   else{
     User.findOne({'email': email},'+password', function(err, user){
       if(user){
         bcrypt.compare(pass, user.password, function (err, result) {
           if(err){
             res.status(401).json({message:"Invalid credentials!"})
             console.log(err);
           }
           if (result === true) {
             var secret = 'sseeccrreett'
             var token = jwt.sign({
               _id: user._id.toHexString(),
               secret
             }, 'test123').toString();

             const data = {
               token: token,
               email: user.email
             }
             res.status(200).json({status: 200, data});
             User.findOneAndUpdate({'email': email}, {$set: {'token': token}}, function(err, response){
               if(err) console.log(err);
             });
 					 }
 					 else{
             res.status(401).json({status: 401, message:"Invalid credentials!"})
 					// 	 res.render('login', {message: "Invalid credentials!"});
 					 }
         });
        }
       else{
         res.status(401).json({message:"no such user found"});
       }
     });
   }
};

exports.sessionDestroy = function(req, res){
  res.clearCookie('loginId');
  delete req.user;
   res.redirect('/login');
};
