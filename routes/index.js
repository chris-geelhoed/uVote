var express = require('express');
var router = express.Router();
var Kitten = require('../models/Kitten')

/* GET home page. */
router.get('/', function (req, res, next) {
  Kitten.find({}, function (err, docs) {
    if (!err) {
        console.log(docs);
        res.send(docs);
    } else {throw err;}
  });
});

module.exports = router;
