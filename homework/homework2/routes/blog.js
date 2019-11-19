const express = require('express');
const router = express.Router();
const authUtil = require('../module/util/authUtils');
const responseMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');
const Blog = require('../model/blog');

// 게시글 전체 보기
router.get('/', (req,res)=>{
    Blog.readAll()
    .then(({
        code,
        json
    }) => res.status(code).send(json))
    .catch((err) =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

// 게시글 개별 보기
router.get('/:id', (req,res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read(id).then(({
        code,
        json
    })=>{
        res.status(code).send(json);
    }).catch((err)=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

// 게시글 작성 하기
router.post('/',(req,res) =>{
    const{
        title,
        content,
        writer,
        pwd,
    } = req.body;

    if(!title || !content || !writer || !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Blog.create(title,content,writer,pwd).then(({
        code,
        json
    })=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

// 게시글 수정 하기
router.put('/', (req,res)=>{
    const{
        idx,
        title,
        content,
        writer,
        pwd,
    } = req.body;

    if (!idx || !title || !content || !writer || !pwd){
        res.status(statusCode.NULL_VALUE,authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Blog.update(idx, title, content, writer, pwd).then(({
        code,
        json
    }) =>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

// 게시글 삭제 하기
router.delete('/',(req,res) =>{
    const{
        idx,
        pwd,
    } = req.body;

    if (!idx || !pwd) {
        res.send(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Blog.delete(idx,pwd).then(({
        code,
        json
    })=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;