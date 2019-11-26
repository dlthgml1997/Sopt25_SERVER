const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const authUtil = require('../../../module/utils/authUtil');
const pool = require('../../../module/pool');

const THIS_LOG = '게시글';
/*
    [GET] localhost/blogs/${blogIdx}/articles
    게시글 전체 보기
*/
router.get('/', async (req, res) => {
    const selectSql = 'SELECT  * FROM article WHERE blogIdx = ?';
    const result = await pool.queryParam_Arr(selectSql, [req.params.blogIdx]);
    if (!result) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.ARTICLE_READ_ALL_SUCCESS,
        result));
});
/*
    [GET] localhost/blogs/${blogIdx}/articles/${articleIdx}
    게시글 하나보기
*/
router.get('/:articleIdx', async (req, res) => {
    const {
        blogIdx,
        articleIdx
    } = req.params;
    // TODO 1 parameter null check
    if (!blogIdx || !articleIdx) {
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }

    const selectSql = 'SELECT  * FROM article WHERE blogIdx = ? AND idx = ?';
    const result = await pool.queryParam_Arr(selectSql, [blogIdx, articleIdx]);
    if (!result) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.ARTICLE_READ_SUCCESS,
        result));
});
/*
    [POST] localhost/blogs/${blogIdx}/articles
    게시글 생성하기
*/
router.post('/', async (req, res) => {
    const {
        blogIdx
    } = req.params;
    // TODO 1 parameter null check
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }
    /*
        TODO 2 Model에서 값 받아오기
        동기 or 비동기 자유롭게 구현
    */
    const insertSql = 'INSERT INTO article(title,contents,blogIdx) VALUES (?,?,?)';
    const result = await pool.queryParam_Arr(insertSql, [req.body.title, req.body.contents, blogIdx]);

    if (!result) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.ARTICLE_CREATE_SUCCESS,
        result));
});
/*
    [PUT] localhost/blogs/${blogIdx}/articles
    게시글 수정하기
*/
router.put('/', async (req, res) => {
    const {
        blogIdx
    } = req.params;
    
    // TODO 1 parameter null check
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST).send(responseMessage.NULL_VALUE);
        return;
    }
    const updateSql = 'UPDATE article SET title= ?, contents = ? WHERE blogIdx = ? AND idx = ?';
    const result = await pool.queryParam_Arr(updateSql,[req.body.title,req.body.contents,blogIdx,req.body.idx]);
    
    if (!result) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.ARTICLE_UPDATE_SUCCESS,
        result));
});
/*
    [DELETE] localhost/blogs/${blogIdx}/articles
    게시글 삭제하기
*/
router.delete('/', async (req, res) => {
    const deleteSql = 'DELETE FROM article WHERE blogIdx = ? AND idx = ?';
    const result = await pool.queryParam_Arr(deleteSql,[Number(req.params.blogIdx),Number(req.body.idx)]);
    
    if (!result) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(statusCode.OK).send(authUtil.successTrue(
        responseMessage.ARTICLE_DELETE_SUCCESS));
});
module.exports = router;