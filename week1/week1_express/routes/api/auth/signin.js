var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('로그인 입니다.');
});

module.exports = router;
