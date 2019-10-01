var express = require('express');
var router = express.Router();

// base : localhost:3000/api/news

// localhost:3000/api/news/like
router.use('/like', require('./like'));

router.get('/', function (req, res) {
  res.send('not supported');
})

module.exports = router;