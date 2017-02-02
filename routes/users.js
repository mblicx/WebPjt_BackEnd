var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO')


/* GET users listing. */
router.get('/', function (req, res, next) {
  UserDAO.getAll()
    .then((users) => {
      //res.send(users);
      res.status(200)
      .json({
        users
      })
    })
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  UserDAO.getById(id)
    .then((user) => {
      res.send(user);
    })
});

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  if (username === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  UserDAO.create(username, email)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user',
          user : result
        })
    })
});


router.delete('/:id', function (req, res, next) {
var id = parseInt(req.params.id);
  UserDAO.deleteById(id)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: 'Delete success'
      });
    })
});

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var username = req.body.username;
  var email = req.body.email;
  var alliance = req.body.alliance;
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
          message: 'update success',
        })
    })
});




module.exports = router;
