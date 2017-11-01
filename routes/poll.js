var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Poll = require('../models/Poll');
var Choice = require('../models/Choice');

var Promise = require('bluebird');

router.post('/', function (req, res, next) {
  var options = {
    new: true,
    upsert: true
  };
  // var userId = '';
  var pollId = '';
  var choiceIds = [];
  var currentUser = {};

  // var ip = req.connection.remoteAddress;
  // ip = 'ExampleGGandAnotherExampleIp';
  // var query = { ip: ip };
  // var newUser = new User({
  //   ip: ip,
  //   choiceIds: [],
  //   createdPollIds: []
  // });
  var choices = req.body.choices.slice(0, 4);
  var userId = req.body.userId;

  User.findById(userId).exec()
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
      currentUser = docs
      userId = docs._id;
      var newChoices = choices.map(function (choice) {
        var newChoice = new Choice({
          choice: choice,
          userIds: []
        });
        return newChoice.save();
      });

      return Promise.all(newChoices);
    })
    .then(function(docs) {
      choiceIds = docs.map(function (doc) {
        return doc._id;
      });

      var newPoll = new Poll({
        creatorUserId: userId,
        choiceIds: choiceIds
      });

      return newPoll.save();
    })
    .then(function (docs) {
      pollId = docs._id;
      currentUser.createdPollIds.push(pollId);
      return User.findByIdAndUpdate(userId, currentUser, options).exec();
    })
    .then(function (docs) {
      res.json({ docs: docs });
    });
});

router.get('/', function (req, res, next) {
  // var examplePollId = '59f37a2e4de3d9072919dff0';
  var pollId = req.query.id;
  var query = pollId ? { _id: pollId } : {};
  Poll.find(query).exec()
    .then(function (docs) {

      // res.json({ docs: docs });

      var polls = docs.map(function (doc) {
        var choices = doc.choiceIds.map(function (choiceId) {
          return Choice.findById(choiceId).exec();
        });
        return Promise.all(choices);
      });
    
      return Promise.all(polls)
      
    })
    .then(function (docs) {

      var pollsData = docs.map(function (pollDoc) {
        return pollDoc.map(function (choiceDoc) {
          return {
            choice: choiceDoc.choice,
            votes: choiceDoc.userIds.length
          };
        });
      });

      res.json({ pollsData: pollsData });
    });
});

module.exports = router;
