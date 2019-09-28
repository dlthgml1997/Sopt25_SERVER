var express = require('express');
var router = express.Router();

// base: localhost:3000/api/auth

// localhost:3000/api/auth/signin
router.use('/signin', require('./signin'));
// localhost:3000/api/auth/signup
router.use('/signup', require('./signup'));

router.get('/', function (req, res) {
  res.send('not supported');
});

module.exports = router;
