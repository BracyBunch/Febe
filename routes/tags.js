var Tag = require('../db').Tag;
var express = require('express');
var router = express.Router();

// home route
router.get('/', function(req, res){
  // access DB to retrieve all tags
  res.send(res);
});

router.get('/search', function(req, res) {
  var fragment = req.query.fragment;
  var kind = req.query.kind || 'skill';
  if (!fragment || fragment.length < 3) return res.status(400).send();

  Tag.find_by_fragment(fragment, kind).then(function(tags) {
    res.json(tags);
  });
});

router.post('/add', function(req, res){
  if (req.body.Test === 'test'){
    return res.send("Test done...");
  }
  // access DB to add a new tag
  res.send();
});

router.delete('/remove', function(req, res){
  // access DB to remove a new tag
  res.send();
});

router.put('/update', function(req, res){
  // access DB to update a new tag
  res.send();
});


module.exports = router;
