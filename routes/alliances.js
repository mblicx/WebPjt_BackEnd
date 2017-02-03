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


router.post('/', function (req, res, next) {
  var alliancename = req.body.alliancename;

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


module.exports = router;