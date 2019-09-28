var express = require('express');
var router = express.Router();

// base : localhost:3000

// localhost:3000/api
router.use('/api', require('./api'));

router.get('/', function (req, res) {
    res.send('not supported');
  });

module.exports = router;
