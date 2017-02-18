var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO')

/* GET home page. */
router.get('/users', function (req, res, next) {
    var userlist = new Array();
    UserDAO.getAll()
        .then((users) => {
            userlist=users
            res.render('users', { title: 'Users', ulist: userlist});
        });   
});
router.get('/users/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    UserDAO.getById(id)
        .then((userDetails) => {
            res.render('user', { title: 'User Profile', user: userDetails});
        });   
});


module.exports = router;
