var User = require('./../models/user');
var Campaign = require('./../models/campaign');
var helpers = require('./../helpers/getDetails');
const bcrypt = require('bcrypt');

exports.manageCampaignNew = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('beginningDate', 'Beginning Date is required').notEmpty();
  req.checkBody('creator', 'Creator is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    let userId = req.signedCookies['loginId'];
    if(userId){
      User.findById(userId, (err, user) => {
          if (err)
            console.log(err);
          res.status(200).json({err: errors, check: "addCampaignValidationError", 
                                email: user.email,                                 
                                result: user.campaign, 
                                message: "Try adding again!"});
        });
    }
    else{
      console.log('you are not login');
    }
  }
  else{
    var title = req.body.title;
    var beginningDate = req.body.beginningDate;
    var token = req.header('auth-token');
    helpers.getUserByToken(token).then((user) => {
      helpers.getIdByEmail(creator)
      .then((creator) => {
        if(!title || !creator) console.log("Invalid details!");
        else{
          Campaign.count({'title': title}, function(err, count){
            if(count === 0){
              var newCampaign = new Campaign({
                title: title,
                beginningDate: beginningDate,
                creator: creator
              });
              newCampaign.save(function(err, campaign){
                if(err) res.redirect('/login');
                else{
                  User.findByIdAndUpdate(creator, {$push: {'campaign': campaign._id}}, function(err, response){
                    res.status(200).json({status: 200, campaign, developer});
                    if(err) console.log(err);
                  });
                }
              });
            }
            else console.log("Campaign already exists. Update campaign details to add a creator");
          });
        }
      }).catch(err => {console.log(err);});
    }).catch(err => {res.status(400).json(err);});
  }
};

exports.getCampaigns = (req, res) => {
  var token = req.header('auth-token');
  helpers.getUserByToken(token).then((user) => {
    helpers.getCampaignsByEmail(user.email).then((userCampaigns) => {      
      const data = {userCampaigns}
      res.status(200).json({status: 200, data});      
    }).catch(err => {res.status(400).json({status: 400, err});});
  }).catch(err => {res.status(400).json({status: 400, err});});
}


exports.updatecampaign = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('beginningDate', 'Beginning Date is required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('profile', {err: errors, type: "editBeginningValidationError", message: "Try adding again!"});
  }
  else{
    var user = req.userData;
    var title = req.body.title;
    var beginningDate = req.body.beginningDate;
    Campaign.count({'title': title}, function(err, count){
      if(count === 0) console.log("Campaign " + title + " is not added. First add the Campaign.");
      else{
        Campaign.findOneAndUpdate({'title': title}, {'beginningDate': beginningDate}, function(err, campaign){
          if(err) console.log(err);
        });
      }
      res.status(200).json("Campaign Beginning Date Updated");
    });
  }
};


exports.removeCampaign = function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  var title = req.body.title;
  Campaign.find({'title': title}, function(err, campaign){
    if(err) console.log(err);
    if(!campaign[0]) console.log("campaign " + title + " doesn't exists!");
    else if(campaign){
      var id = campaign[0]._id;
      User.update({}, {$pull: {'campaign': id}}, {multi: true}, function(err, response){
        if(err) console.log(err);
      });
      Campaign.findByIdAndRemove(id, {multi: true}, function(err, response){
        if(err) console.log(err);
      });
    }
    res.status(200).json({status: 200, response: "campaign Deleted"});
  });
};
