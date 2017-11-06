var express = require('express');
var router = express.Router();

var Choice = require('../models/Choice');

var Promise = require('bluebird');


router.post('/', function (req, res, next) {
  
  var choiceId = req.body.choiceId

  Choice.findById(choiceId).exec()
    .then(function(docs) {
        res.json({
            choiceId: choiceId,
            docs: docs
        })
    })
});

module.exports = router;
