const express = require('express');
const router = express.Router();

//get User schema model
const User = require('../models/users');

//get all users
router.get('/getUsers', function (req, res, next) {
    User.find(function (err, users) {
        res.json(users);
    })
});

//add user
router.post('/registerUser', function (req, res, next) {
    console.log(req.body);
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        emailID: req.body.emailID,
        watchlist: req.body.watchlist 
    });

    newUser.save(function (err, user) {
        if (err) {
            res.json({
                msg: 'Error adding user!'
            });
        } else {
            res.json({
                msg: 'User added!'
            });
        }
    });

});


//delete user
router.delete('/removeUser', function (req, res, next) {
    User.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else { 
            res.json(result);
        }
    });
});

module.exports = router;