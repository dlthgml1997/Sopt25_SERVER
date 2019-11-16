const jwt = require('../jwt');

const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn: async(req, res, next) => {
        const { token } = req.headers;
        if (!token) {
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMessage.EMPTY_TOKEN));
            return;
        } 
        const result = jwt.verify(token);

        if(result == -1) {
            res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.EXPIRED_TOKEN));
            return;
        }

        if(result == -2) {
            res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.INVALID_TOKEN));
            return;
        }

        const userIdx = result.idx;
        if (!userIdx){
            res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.NULL_VALUE));
            return;
        }
        req.decoded = userIdx;
        next();
    },
};

module.exports = authUtil;