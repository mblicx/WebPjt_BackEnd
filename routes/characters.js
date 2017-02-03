var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO')

router.get('/', function (req, res, next) {
  CharacterDAO.getAll()
    .then((result) => {
      res.send(result);
    })
});

router.get('/:param', function (req, res, next) {
  var chaclass = req.params.param;
  var id = parseInt(req.params.param);
  if ((chaclass.charAt(0) === '{' )&& (chaclass.charAt(chaclass.length - 1) === '}')) {
    var subclass = chaclass.substring(1, chaclass.length - 1);
    CharacterDAO.getByClass(subclass)
      .then((result) => {
        if (result.length === 0) {
          res.status(200)
            .json({
              result: 'no result/We can not find anyone in this class'
            })
        }
        res.send(result);
      })
      .catch((error) =>
        res.status(error))
  }
  else {
    CharacterDAO.getById(id)
      .then((result) => {
        res.send(result);
      })
      .catch((error) =>
        res.send(error))
  }

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
