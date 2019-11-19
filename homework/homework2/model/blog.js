const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const authUtil = require('../module/util/authUtils')

const blogArr = [{
    title: "제목",
    content: "내용",
    writer: "이소희",
    pwd: "비밀번호",
    time: "3시20분"
}];

module.exports = {
    create: (title, content, writer, pwd) => {
        return new Promise((resolve, reject) => {
            const idx = blogArr.push({
                title,
                content,
                writer,
                pwd,
                time: Date.now()
            });
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_CREATE_SUCCESS,
                    idx
                )
            });
        })
    },
    readAll: () => {
        return new Promise((resolve, reject) => {
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_READ_ALL_SUCCESS,
                    blogArr
                )
            });
        });
    },
    read: (idx) => {
        return new Promise((resolve, reject) => {
            if (idx >= blogArr.length) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_READ_ALL_SUCCESS,
                    blogArr[idx])
            });
        });
    },
    update: (idx,title,content,writer,pwd) =>{
        return new Promise((resolve,reject)=>{
            // idx 값 확인
            if (idx >= blogArr.length) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            // 비밀번호 확인
            if (blogArr[idx].pwd != pwd){
                resolve({
                    code: statusCode.FORBIDDEN,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            blogArr[idx].title = title;
            blogArr[idx].content = content;
            blogArr[idx].writer = writer;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS,blogArr[idx])
            });
        });
    },
    delete: (idx,pwd) =>{
        return new Promise((resolve, reject)=>{
            // idx값 확인
            if(idx >= blogArr.length){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            // 비밀번호 확인
            if(pwd != blogArr[idx].pwd){
                resolve({
                    code: statusCode.FORBIDDEN,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            blogArr[idx]={};
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            });
        });
    }
}