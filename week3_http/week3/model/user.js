const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const authUtil = require('../module/util/authUtils')

const userDB = [];

module.exports = {
    signin: (id, pwd) => {
        return new Promise((resolve, reject) => {
            // 존재하는 아이디인지 확인 (실패시 400 Error)
            const user = userDB.find(it => it.id === id);
            console.log(user);
            if (!user) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_USER)
                })
                return;
            }

            // 비밀번호 일치하는지 확인 ( 실패시 401 Error)
            if(user.pwd != pwd){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                })
                return;
            }

            // 유저 정보 응답하기
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
            });
        });
    },
    signup: (id, pwd, name, address) => {
        return new Promise((resolve, reject) => {
            // TODO 2: 존재하는 ID인지 확인한다. (실패시 401 Error)
            if (userDB.filter(it => it.id == id).length > 0) {
                resolve({
                    code: statusCode.UNAUTHORIZED,
                    json: authUtil.successFalse(responseMessage.ALREADY_ID)
                });
                return;
            }
            // TODO 3: 사용자 정보를 저장한다.
            const user = {
                id,
                pwd,
                name,
                address
            }
            userDB.push(user);
            console.log(userDB);

            // TODO 4: 새로 추가된 유저 index 반환하기
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, user)
            })
        })
    }
}
