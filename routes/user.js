var express = require('express');
var router = express.Router();

var User = require('../models/User');

var Promise = require('bluebird');

router.post('/', function (req, res, next) {
  var userId = '';
  var currentUser = {};
  var ip = req.connection.remoteAddress;
  ip = 'ExampleGGandAnotherExampleIp';
  var query = { ip: ip };

  var newUser = new User({
    ip: ip,
    choiceIds: [],
    createdPollIds: []
  });

  User.findOne(query).exec()
    .then(function (docs) {
      if (docs) {
        return new Promise(function (res) {
          res(docs);
        });
      } else {
        return newUser.save();
      }
    })
    .then(function (docs) {
      userId = docs._id;
      res.json({ userId: userId });
    });
});

module.exports = router;
