var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('인기 순위 입니다.');
});

module.exports = router;
