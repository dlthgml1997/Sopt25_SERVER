const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = require('../config/multer');

router.post('/single', upload.single('image'), (req,res)=>{
        console.log(req.file);
        console.log(req.body);
        res.send({ file : req.file, body: req.body});
});

// 파일이 하나여도 배열로 들어온다.
router.post('/array',upload.array('photos',5),(req,res) =>{
        console.log(req.files);
        console.log(req.body);
        res.send({ files: req.files, body: req.body });
})

// 파일이 하나여도 배열로 들어온다.
var cpUpload = upload.fields([{ name:'thumbnail',maxCount: 2},{name:'images',maxCount: 5}])
router.post('/fields',cpUpload, (req,res)=>{
        console.log(req.files);
        console.log(req.body);
        res.send({file: req.files,body: req.body});
})

module.exports = router;