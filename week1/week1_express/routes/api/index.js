var express = require('express');
var router = express.Router();

// base : localhost:3000/api

// localhost:3000/api/board
router.use('/board', require('./board'));
// localhost:3000/api/auth
router.use('/auth', require('./auth'));

router.get('/', function (req, res) {
    res.send('not supported');
});

module.exports = router;
