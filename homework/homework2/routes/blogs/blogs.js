const express = require('express');
const router = express.Router();
const authUtil = require('../../module/utils/authUtil');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const pool = require('../../module/pool');


router.get('/', async (req,res)=>{
    const selectSql ='SELECT * FROM blog'
    const result = await pool.queryParam_None(selectSql);

    if(!result){
        res.status(500).send(`error`);
        return;
    }
    res.status(200).send(result);
});

router.post('/', async (req,res) =>{
    console.log(req.body);
    
    const insertSql = 'INSERT INTO blog(title, contents, writer, writer_time) VALUES (?,?,?,NOW())';
    const result = await pool.queryParam_Arr(insertSql,[req.body.title, req.body.contents, req.body.writer]);

    console.log(result);
    
    if(!result){
        res.status(500).send(`error`);
        return;
    }
    res.status(200).send(result);
});

router.put('/', async (req,res) =>{
    const updateSql = 'UPDATE blog SET title=? , contents= ? WHERE idx = ?';
    const result = await pool.queryParam_Arr(updateSql,[req.body.title,req.body.contents, Number(req.body.idx)]);

    if(!result){
        res.status(500).send(`error`);
        return;
    }
    res.status(200).send(result);
});

router.delete('/', async (req,res) =>{
    const deleteSql = 'DELETE FROM blog WHERE idx = ?';
    const result = await pool.queryParam_Arr(deleteSql,[req.body.idx]);
    
    if(!result){
        res.status(500).send(`error`);
        return;
    }
    res.status(200).send(result);
});

module.exports = router;