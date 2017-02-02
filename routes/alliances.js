var express = require('express');
var router = express.Router();
const UserDAO = require('../models/AlliancesDAO')


/* GET users listing. */
router.get('/', function(req, res, next) {
  AlliancesDAO.getAll()
    .then((users)=> {
      res.send(users);
    })
});



module.exports = router;
