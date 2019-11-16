const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/boards', require('./boards'));
router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));

module.exports = router;