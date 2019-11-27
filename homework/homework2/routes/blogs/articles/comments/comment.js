const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../../module/utils/statusCode');
const responseMessage = require('../../../../module/utils/responseMessage');
const authUtil = require('../../../../module/utils/authUtil');
const pool = require('../../../../module/pool')

const THIS_LOG = '댓글';
/*
    [GET] localhost/blogs/${blogIdx}/articles/${articleIdx}/comments
    댓글 전체 보기
*/
router.get('/', async (req, res) => {
    const selectSql = 'SELECT * FROM comment WHERE articleIdx= ?';
    const result = await pool.queryParam_Arr(selectSql,[req.params.articleIdx]);
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.COMMENT_READ_ALL_SUCCESS,
        result));
        
});
/*
    [GET] localhost/blogs/${blogIdx}/articles/${articleIdx}/comments/${commentIdx}
    댓글 하나보기
*/
router.get('/:commentIdx', async (req, res) => {
    const {
        articleIdx,
        commentIdx
    } = req.params;
    if(!commentIdx || articleIdx){
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }
    const selectSql = 'SELECT * FROM comment WHERE idx = ? AND articleIdx = ?'
    const result = await pool.queryParam_Arr(selectSql,[commentIdx,articleIdx]);
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.COMMENT_READ_SUCCESS,
        result));
});
/*
    [POST] localhost/blogs/${blogIdx}/articles/${articleIdx}/comments
    댓글 생성하기
*/
router.post('/', async (req, res) => {
    const {
        articleIdx
    } = req.params;
    // TODO 1 parameter null check
    if(!articleIdx){
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }
    const insertSql = 'INSERT INTO comment(writer,contents,articleIdx) VALUES(?, ?, ?)';
    const result = await pool.queryParam_Arr(insertSql,[req.body.writer,req.body.contents,articleIdx]);
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.COMMENT_CREATE_SUCCESS,
        result));
});
/*
    [PUT]  localhost/blogs/${blogIdx}/articles/${articleIdx}/comments
    댓글 수정하기
*/
router.put('/', async (req, res) => {
    const {
        articleIdx
    } = req.params;
    if(!articleIdx){
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }
    const updateSql = 'UPDATE comment SET writer= ?, contents = ? WHERE articleIdx = ? AND idx = ?';
    const result = await pool.queryParam_Arr(updateSql,[req.body.writer,req.body.contents,articleIdx,req.body.idx]);
    if(!result){
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.COMMENT_UPDATE_SUCCESS,
        result));
});
/*
    [DELETE] localhost/blogs/${blogIdx}/articles/${articleIdx}/comments
    댓글 삭제하기
*/
router.delete('/', async (req, res) => {
    const deleteSql = 'DELETE FROM comment WHERE articleIdx = ? AND idx = ?';
    await pool.queryParam_Arr(deleteSql,[req.params.articleIdx,req.body.idx]);

    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.COMMENT_DELETE_SUCCESS));
});
module.exports = router;