var express = require('express');
var router = express.Router({mergeParams: true});

// localhost:3000/blogs/${blogIdx}/articles
router.use('/:blogIdx/articles', require('./articles'));

// localhost:3000/blogs
router.use('/', require('./blogs'));

module.exports = router;