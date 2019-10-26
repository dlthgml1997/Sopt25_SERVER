const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const responseMessage = require('../module/responseMessage');
const statusCode = require('../module/statusCode');
const Board = require('../model/board');

router.get('/', (req, res) => { 
    /* TODO : 게시글 전체 보기 */
    Board.readAll()
    .then(({code,json}) => res.status(code).send(json))
    .catch((err) =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});
router.get('/:id', (req, res) => { /* TODO : 게시글 개별 보기 */});
router.post('/', (req, res) => { /* TODO : 게시글 작성 하기 */});
router.put('/', (req, res) => { /* TODO : 게시글 수정 하기*/ });
router.delete('/', (req, res) => { /* TODO : 게시글 삭제 하기 */});

module.exports = router;