/**
 * 用户登录与注册相关模块
 * User: hjm100
 * Date: 18-05-16 16:55
 */
import Register from "../views/login/Register/register.vue";
import RegisterTips from "../views/login/Register/registerTips.vue";
import Login from "../views/login/login.vue";
import FindPwd from "../views/login/findPwd.vue";
import ResetPwd from "../views/login/resetPwd.vue";
import ChangePwd from "../views/login/changePwd.vue";

const LOGIN_ROUTER = [
    {
        path: "/register",
        meta: {
            title: "注册"
        },
        name: "Register",
        component: Register
    },
    {
        path: "/registerTips",
        meta: {
            title: "用户使用协议"
        },
        name: "RegisterTips",
        component: RegisterTips
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "登录"
        }
    },
    {
        path: "/findPwd",
        name: "FindPwd",
        component: FindPwd,
        meta: {
            title: "找回密码"
        }
    },
    {
        path: "/resetPwd",
        meta: {
            title: "重置密码"
        },
        name: "ResetPwd",
        component: ResetPwd
    },
    {
        path: "/changePwd",
        name: "ChangePwd",
        component: ChangePwd,
        meta: {
            title: "修改密码"
        }
    }
];

export default LOGIN_ROUTER;