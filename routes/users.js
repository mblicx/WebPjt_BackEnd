var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO')


/* GET users listing. */
router.get('/', function (req, res, next) {
  UserDAO.getAll()
    .then((users) => {
      //res.send(users);
      userlist=users;
      res.status(200)
      .json({ 
        status: 'success',
        users:users
      });
    });
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.getById(id)
    .then((users) => {
      //res.send(user);
      res.status(200)
        .json({
          status: 'success',
          user: users
        });
    });
});

router.get('/:id/characters', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.getCharacters(id)
    .then((users) => {
      //res.send(user);
      res.status(200)
        .json({
          status: 'success',
          characters: users
        });
    })
});

router.post('/', function (req, res, next) {
  var username = req.body.user.name;
  var email = req.body.user.email;
  var alliance = req.body.user.alliance;
  if (username === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  UserDAO.create(username, email, alliance)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user',
          user: result
        })
    })
});


router.delete('/:id', function (req, res, next) {
var id = parseInt(req.params.id);
  UserDAO.deleteById(id)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: result
      });
    })
});

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var username = req.body.user.name;
  var email = req.body.user.email;
  var alliance = req.body.user.alliance_id;
  if (username === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  UserDAO.updateById(id,username, email, alliance)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a user',
          user: result[0]
        })
    })
});




module.exports = router;
