var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO')

router.get('/', function (req, res, next) {
  CharacterDAO.getAll()
    .then((users) => {
      res.send(users);
    })
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  CharacterDAO.getById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((error) =>
      res.send(error))
});

router.post('/', function (req, res, next) {
  var name = req.body.name;
  var chaclass = req.body.class;
  var user_id = req.body.user_id;
  var point = req.body.position;

  if (name === undefined || user_id === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  CharacterDAO.create(name, chaclass, user_id, point)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user',
          character: result
        });
    })
});

router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  CharacterDAO.deleteById(id)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: 'Delete success'
      });
    })
});

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.name;
  var user_id = req.body.user_id;
  var chaclass = req.body.class;
  var position = req.body.position
  if (name === undefined || user_id === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  CharacterDAO.updateById(id, name, user_id, chaclass, position)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'update success',
        })
    })
});


module.exports = router;
