var express = require('express');
var router = express.Router();
const CharactersDAO = require('../models/CharactersDAO')


/* GET characters listing. */
router.get('/', function(req, res, next) {
  CharactersDAO.getAll()
    .then((characters)=> {
      res.send(characters);
    })
});

router.get('/:id', function(req, res, next) {
  var id = parentInt(req.params.id);
  CharactersDAO.getById(id)
    .then((characters)=> {
      res.send(characters);
    })
});



module.exports = router;
