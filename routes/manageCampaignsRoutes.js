var express = require('express');
var router = express.Router();
var manageCampaigns = require('./../app/controller/manageCampaignController');
var check = require('./../app/middlewares/checks.js');

router.post('/addcampaigns', manageCampaigns.manageCampaignNew);

/*
router.post('/getcampaigns', manageCampaigns.getCampaigns);
router.post('/updatecampaign', manageCampaigns.updatecampaign);
router.post('/removeCampaign', manageCampaigns.removeCampaign);*/

module.exports = router;
