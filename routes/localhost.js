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

module.exports = router;
