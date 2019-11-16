const express = require('express');
const router = express.Router();
const authUtil = require('../module/util/authUtils');
const responseMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');
const Board = require('../model/board');

router.get('/', (req, res) => {
    /* TODO : 게시글 전체 보기 */
    Board.readAll()
        .then(({
            code,
            json
        }) => res.status(code).send(json))
        .catch((err) => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/:id', (req, res) => {
    /* TODO : 게시글 개별 보기 */
    const id = req.params.id;
    if (!id) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Board.read(id).then(({
        code,
        json
    })=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/', (req, res) => {
    /* TODO : 게시글 작성 하기 */ 
    const{
        title,
        content,
        writer,
        pwd,
    } = req.body;

    if(!title|| !content|| !writer || !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Board.create(title,contet,writer,pwd).then(({
        code,
        json
    })=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res) => {
    /* TODO : 게시글 수정 하기*/ 
    const {
        idx,
        title,
        content,
        writer,
        pwd
    } = req.body;
    if(!idx || !title|| !content|| !writer || !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    } 

    Board.update(idx, title,content,writer,pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/', (req, res) => {
    /* TODO : 게시글 삭제 하기 */ 
    const {
        idx,
        pwd
    } = req.body;
    if(!idx|| !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Board.delete(idx,pwd).then(({
        code,
        json
    }) =>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;