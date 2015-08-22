var Tag = require('../db').Tag;
var express = require('express');
var router = express.Router();

router.get('/search', function(req, res) {
  var fragment = req.query.fragment;
  var kind = req.query.kind;
  // if (!fragment || fragment.length < 3) return res.status(400).send();

  Tag.find_by_fragment(fragment, kind).then(function(tags) {
    res.json(tags);
  });
});

module.exports = router;
