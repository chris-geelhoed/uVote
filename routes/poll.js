var express = require('express');
var router = express.Router();
var User = require('../models/User')

router.post('/', function (req, res, next) {
  var ip = req.connection.remoteAddress;
  var query = { ip: ip };
  var options = {
    new: true,
    upsert: true
  };
  
  User.findOneAndUpdate(query, options).exec()
    .then(function(doc) {
      console.log(doc);
      res.json('saved');
    });

});

module.exports = router;
