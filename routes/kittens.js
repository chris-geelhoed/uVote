var express = require('express');
var router = express.Router();
var Kitten = require('../models/Kitten')

router.post('/', function (req, res, next) {
  Kitten.find({}, function (err, docs) {
    if (!err) {
        console.log(docs);
        res.json(docs);
    } else {throw err;}
  });
});

module.exports = router;
