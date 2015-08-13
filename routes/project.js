var Project = require('../db').Project;
var express = require('express');
var router = express.Router();

// home route
router.get('/', function(req, res){
  // access DB to retrieve all projects
  res.send(res);
});

router.post('/add', function(req, res){
  if (req.body.Test === 'test'){
    return res.send("Test done...");
  }
  // access DB to add a new project
  res.send();
});

router.delete('/remove', function(req, res){
  // access DB to remove a new project
  res.send();
});

router.put('/update', function(req, res){
  // access DB to update a new project
  res.send();
});

router.put('/:project_id/add_member/:user_id', function(req, res) {
  var project_id = Number(req.params.project_id);
  var user_id = Number(req.params.user_id);
  if (Number.isNaN(project_id) || Number.isNaN(user_id)) return res.status(400).send();

  if (!req.isAuthenticated) return res.status(401).send();

  Project.with_extras(project_id, {'owner': true}).then(function(project) {
    if (project.owner.id !== req.user.id) throw new Error('User doesn\'t have permission to add members');
    return Project.add_member(project_id, user_id).then(function() {
      res.status(201).send();
    });
  }, function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;
