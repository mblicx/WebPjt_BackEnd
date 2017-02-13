var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AllianceDAO');
/* GET users listing. */
router.get('/', function (req, res, next) {
  AllianceDAO.getAll()
    .then((alliances) => {
      //res.send(alliances);

      res.status(200)
        .json({
          status: 'success',
          alliances: alliances
        });

    })
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getById(id)
    .then((alliances) => {
      //res.send(alliance);
      res.status(200)
        .json({
          status: 'success',
          alliance: alliances
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
router.get('/:id/users', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getUsersById(id)
    .then((alliance) => {
      // res.send(alliance);
      res.status(200)
        .json({
          status: 'success',
          users: alliance
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
router.get('/:id/characters', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getCharactersById(id)
    .then((alliance) => {
     // res.send(alliance);
       res.status(200)
        .json({
          status: 'success',
          characters: alliance
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

router.get('/:id/characters/:class', function (req, res, next) {
  var id = parseInt(req.params.id);
  var chaclass = req.params.class;

  AllianceDAO.getCharactersByIdAndClass(id, chaclass)
    .then((alliance) => {
     // res.send(alliance);
     res.status(200)
        .json({
          status: 'success',
          characters: alliance
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
  var alliancename = req.body.alliance.name;

  if (alliancename === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  AllianceDAO.create(alliancename)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one alliance',
          alliance: result[0]
        });
    })
});

router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.deleteById(id)
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        status: 'success',
        message: result
      });
    })
});

router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  var name = req.body.alliance.name;
  if (name === undefined) {
    res.status(422)
      .json({
        status: 'Error',
        message: 'Missing parameter(s)'
      });
  }
  AllianceDAO.updateById(id, name)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'modified a alliance',
          alliance: result[0]

        })
    })
});


module.exports = router;