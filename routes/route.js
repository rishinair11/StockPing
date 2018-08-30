const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//get User schema model
const User = require('../models/users');

//get all users
router.get('/getAll', function(req, res, next) {
  User.find({}, 'username watchlist emailID', function(err, users) {
    if (err) {
      throw err
    } else {
      res.json(users);
    }
  });
});

router.post('/login', function(req, res, next) {
  User.find({
    username: req.body.username,
    password: req.body.password
  }, 'username watchlist', function(err, users) {
    if (err) {
      throw err
    } else {
      res.json(users);
    }
  });
});

router.get('/getOne', function(req, res, next) {
  User.findOne({
    username: req.query.username
  }, function(err, result) {
    if (err) {
      throw err
    } else {
      res.json(result.watchlist);
      console.log(result.watchlist);
    }
  });
});

//add user
router.post('/register', function(req, res, next) {
  console.log(req.body);
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    emailID: req.body.emailID,
    watchlist: null
  });

  newUser.save(function(err, user) {
    if (err) {
      res.json({
        msg: 'Error adding user!',
        error: err
      });
    } else {
      res.json({
        msg: 'User added!' + user
      });
    }
  });

});

router.post('/update', function(req, res, next) {
  User.findOneAndUpdate({
    username: req.body.username
  }, {
    watchlist: req.body.watchlist
  }, function(err, result) {
    if (err) {
      throw err
    } else {
      res.json({
        msg: "User updated"
      });
    }
  });
});


//delete user
router.delete('/remove', function(req, res, next) {
  User.remove({
    _id: req.params.id
  }, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
