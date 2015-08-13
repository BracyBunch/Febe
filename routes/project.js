var Project = require('../db').Project;
var express = require('express');
var http = require('http');
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


module.exports = router;
