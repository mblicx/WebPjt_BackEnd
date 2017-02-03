var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AllianceDAO');
/* GET users listing. */
router.get('/', function (req, res, next) {
  AllianceDAO.getAll()
    .then((alliances) => {
      res.send(alliances);
    })
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getById(id)
    .then((alliance) => {
      res.send(alliance);
    })
    .catch((error) =>
      res.send(error))
});
router.get('/:id/users', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.getUsersById(id)
    .then((alliance) => {
      res.send(alliance);
    })
    .catch((error) =>
      res.send(error))
});

router.post('/', function (req, res, next) {
  var alliancename = req.body.name;

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
          message: 'Inserted one alliancename',
          alliance: result
        });
    })
});

router.delete('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  AllianceDAO.deleteById(id)
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
          message: 'update success',
        })
    })
});

module.exports = router;