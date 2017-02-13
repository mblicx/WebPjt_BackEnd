var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO')

router.get('/', function (req, res, next) {
  CharacterDAO.getAll()
    .then((result) => {
      //res.send(result);
      res.status(200)
        .json({
          status: 'success',
          characters: result
        });
    })
});


router.get('/:id', function (req, res, next) {
  
  var id = parseInt(req.params.id);

  
    CharacterDAO.getById(id)
      .then((result) => {
        // res.send(result);
        res.status(200)
          .json({
            status: 'success',
            character: result
          });
      })
      .catch((error) =>
        //res.send(error)

        res.status(500)
          .json({
            status: 'Error',
            message: error
          })
      )
  

});

router.get('/all/:class', function (req, res, next) {
  
  var subclass = req.params.class;

    CharacterDAO.getByClass(subclass)
      .then((result) => {
        if (result.length === 0) {
          res.status(200)
            .json({
              result: 'no result/We can not find anyone in this class'
            })
        }
       // res.send(result);
        res.status(200)
        .json({
          status: 'success',
          characters: result
        });
      })
      .catch((error) =>
       res.status(500)
          .json({
            status: 'Error',
            message: error
          })
      )
  
    
  

});


router.post('/', function (req, res, next) {
  var name = req.body.character.name;
  var chaclass = req.body.character.class;
  var user_id = req.body.character.user_id;
  var point_x = req.body.character.position.x;
  var point_y = req.body.character.position.y;


  if (name === undefined || user_id === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  CharacterDAO.create(name, chaclass, user_id, point_x, point_y)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one character',
          character: result[0]
        });
    })
});

router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  CharacterDAO.deleteById(id)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: result
      });
    })
});

router.get('/:id/allies/:radius', function (req, res, next) {

  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);

  CharacterDAO.getInDistenceAlliance(id, radius)
    .then((result) => {
      if (result.length === 0) {
        res.status(200)
          .json({
            status: 'success',
            result: 'Nobody in distence'
          })
      }
      res.status(200)
        .json({
          status: 'success',
          characters: result
        })
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

router.get('/:id/ennemies/:radius', function (req, res, next) {

  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);

  CharacterDAO.getInDistenceEnnemies(id, radius)
    .then((result) => {
      if (result.length === 0) {
        res.status(200)
          .json({
            status: 'success',
            result: 'Nobody in distence'
          })
      }
      res.status(200)
        .json({
          status: 'success',
          characters: result
        })
    })
    .catch((error) =>
      res.status(500)
        .json({
          status: 'Error',
          message: error
        })
    )
});

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.character.name;
  var user_id = req.body.character.user_id;
  var chaclass = req.body.character.class;
  var point_x = req.body.character.position.x;
  var point_y = req.body.character.position.y;
  if (name === undefined || user_id === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  CharacterDAO.updateById(id, name, user_id, chaclass, point_x, point_y)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a character',
          character: result[0]
        })
    })
});

module.exports = router;