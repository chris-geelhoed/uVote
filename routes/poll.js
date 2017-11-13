var express = require('express');
var router = express.Router();

var Poll = require('../models/Poll');
var Choice = require('../models/Choice');

var Promise = require('bluebird');

var helpers = require('../helpers');
var getHotness = helpers.getHotness;
var formatTime = helpers.formatTime;

router.post('/', function (req, res, next) {
  var choices = req.body.choices.slice(0, 4);
  var title = req.body.title;
  var ip = req.connection.remoteAddress;

  var newChoices = choices.map(function (choice) {
    var newChoice = new Choice({
      choice: choice,
      voterIps: []
    });
    return newChoice.save();
  });
    
  Promise.all(newChoices)
    .then(function(docs) {
      var choiceIds = docs.map(function (doc) {
        return doc._id;
      });

      var newPoll = new Poll({
        creatorIp: ip,
        timeCreated: Date.now(),
        title: title,
        choiceIds: choiceIds
      });

      return newPoll.save();
    })
    .then(function (docs) {
      res.json({ docs: docs });
    });
});

router.get('/', function (req, res, next) {
  var pollId = req.query.id;
  var query = pollId ? { _id: pollId } : {};
  var pollsData = [];
  Poll.find(query).exec()
    .then(function (docs) {
      var pollPromises = [];
      docs.forEach(function (poll) {

        pollsData.push({
          id: poll._id,
          timeCreated: poll.timeCreated,
          formattedTimeCreated: formatTime(poll.timeCreated),
          title: poll.title,
          choices: []
        });

        var choicePromises = poll.choiceIds.map(function (choiceId) {
          return Choice.findById(choiceId).exec();
        });

        var allChoicePromises = Promise.all(choicePromises);
        pollPromises.push(allChoicePromises)
      });
        
      return Promise.all(pollPromises)
    })
    .then(function (docs) {

      docs.forEach(function(pollChoices, index) {
        var totalVotes = 0;
        var choiceData = [];
        pollChoices.forEach(function(pollChoice) {
          var votes = pollChoice.voterIps.length
          totalVotes += votes
          var pollChoice = {
            id: pollChoice._id,
            text: pollChoice.choice,
            votes: votes
          };
          choiceData.push(pollChoice)
        });
        
        pollsData[index].choices = choiceData;
        pollsData[index].totalVotes = totalVotes;
        var timeCreated = pollsData[index].timeCreated;
        pollsData[index].hotness = getHotness(totalVotes, timeCreated);
      });

      res.json(pollsData);
    });
});

module.exports = router;
