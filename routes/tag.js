var Tag = require('../db').Tag;
var express = require('express');
var router = express.Router();

router.get('/search', function(req, res) {
  var fragment = req.query.fragment;
  var kind = req.query.kind;
  var limit = ('limit' in req.query) ? Number(req.query.limit) : undefined;
  // if (!fragment || fragment.length < 3) return res.status(400).send();

  Tag.find_by_fragment(fragment, kind, limit).then(function(tags) {
    res.json(tags);
  });
});

module.exports = router;
