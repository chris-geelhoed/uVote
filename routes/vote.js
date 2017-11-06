var express = require('express');
var router = express.Router();

var Choice = require('../models/Choice');
var Poll = require('../models/Poll');

var Promise = require('bluebird');


router.post('/', function (req, res, next) {
  
  var choiceId = req.body.choiceId
  var pollId = req.body.pollId
  var ip = req.connection.remoteAddress;

  Poll.findById(pollId).exec()
    .then(function (docs) {
        var choicePromises = docs.choiceIds.map(function (choiceId) {
            return Choice.findById(choiceId).exec()
        });
        return Promise.all(choicePromises)
    })
    .then(function(docs) {
        var updateChoicePromises = docs.map(function (choice) {
            var newChoice = choice
            var voterIpIndex = newChoice.voterIps.indexOf(ip)
            if (voterIpIndex !== -1) {
                newChoice.voterIps.splice(voterIpIndex, 1)
            }

            if (newChoice._id.toString() === choiceId) {
                newChoice.voterIps.push(ip)
            }

            return Choice.findByIdAndUpdate(newChoice._id, newChoice).exec()
        });

        return Promise.all(updateChoicePromises)
    })
    .then(function (docs) {
        res.json({ voteWasSuccessful: true })
    })
});

module.exports = router;
