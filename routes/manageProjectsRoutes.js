var express = require('express');
var router = express.Router();
var manageProjects = require('./../app/controller/manageProjectController');
var check = require('./../app/middlewares/checks.js');

router.get('/addProjects', manageProjects.manageProjectNew);
router.post('/addProjects', manageProjects.projectCreate);

router.post('/projects', manageProjects.getProjects);

router.post('/addProjectDeveloper', check.isManager, manageProjects.addProjectDeveloper);
router.post('/editProjectDescription', check.isManager, manageProjects.editProjectDescription);
router.post('/editProjectBeginningDate', check.isManager, manageProjects.editProjectBeginningDate);
router.post('/editProjectDueDate', check.isManager, manageProjects.editProjectDueDate);
router.post('/removeProject', check.isManager, manageProjects.removeProject);

module.exports = router;
