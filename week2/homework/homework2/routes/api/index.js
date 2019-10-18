var express = require('express');
var router = express.Router();

// base : localhost:3000/api

// localhost:3000/api/group
router.use('/group', require('./group'));

router.get('/', function (req, res) {
  res.send('not supported');
})

module.exports = router;