var express = require('express');
var router = express.Router();

// base : localhost:3000/api

// localhost:3000/api/news
router.use('/news', require('./news'));
// localhost:3000/api/blog
router.use('/blog', require('./blog'));
// localhost:3000/api/cafe
router.use('/cafe', require('./cafe'));

router.get('/', function (req, res) {
  res.send('not supported');
})

module.exports = router;