var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO')
const AllianceDAO = require('../models/AllianceDAO')
const CharacterDAO = require('../models/CharacterDAO')
/* GET home page. */
router.get('/users', function (req, res, next) {
    var userlist = new Array();
    UserDAO.getAllForView()
        .then((users) => {
            userlist=users
            res.render('users', { title: 'Users', ulist: userlist});
        });   
});

router.get('/users/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    UserDAO.getByIdForView(id)
        .then((userDetails) => {
            res.render('user', { title: 'User Profile', user: userDetails});
        });   
});

router.get('/alliances', function (req, res, next) {
    var alliancelist = new Array();
    AllianceDAO.getAll()
        .then((alliances) => {
            alliancelist=alliances
            res.render('alliances', { title: 'Alliances', alist: alliancelist});
        });   
});
router.get('/alliances/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    AllianceDAO.getById(id)
        .then((allianceDetails) => {
            res.render('alliance', { title: 'Alliance Profile', alliance: allianceDetails});
        });   
});
router.get('/characters', function (req, res, next) {
    var characterlist = new Array();
    CharacterDAO.getAllForView()
        .then((characters) => {
            characterlist=characters
            res.render('characters', { title: 'Characters', clist: characterlist});
        });   
});

router.get('/characters/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    CharacterDAO.getByIdForView(id)
        .then((characterDetails) => {
            res.render('character', { title: 'Character Profile', character: characterDetails});
        });   
});

module.exports = router;
