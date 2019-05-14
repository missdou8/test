import ApiService from '../service/http'

class Login {
    constructor() {
        this.http = new ApiService()
    }
    checkLogin(url) {
        return this.http.user.checkLogin({
            backurl: url
        }).then(result => {
            return {
                isLogin: result.data.isLogin == 1,
                url: result.data.url
            }
        });
    }
    wechatLogin(code) {
        return this.http.user.weixinLogin({
            code: code
        }).then((result) => {
            if (result.data.register === 1) {
                return true
            } else {
                return false
            }
        }
        )
    }
    noLogin(path) {
        if (
            path == "/registerTips" ||
            path == "/register" ||
            path == "/login" ||
            path == "/match/share" ||
            path == "/findPwd" ||
            path == "/resetPwd"
        ) {
            return true;
        } else {
            return false;
        }
    }
}


export default Login