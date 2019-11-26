var express = require('express');
var router = express.Router();

// base : localhost:3000

// localhost:3000/api
router.use('/api', require('./api'));

// localhost:3000/blogs
router.use('/blogs', require('./blogs'));

router.get('/', function (req, res) {
  res.send('not supported');
})

module.exports = router;