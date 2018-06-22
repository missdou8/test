import axios from "axios";
import qs from "qs";
import errorcode from "./errcode.js";
import _this from "../main.js";
import match from "./match.js";
import user from "./user.js";
import publicHttp from "./publicHttp.js";

/**
 * 常量
 */
const hostname = "/index.php/api/";

const reqAndUrl = Object.assign(match, user, publicHttp);

class ApiService {
  getSessionData(sessionItem) {
    let sessionValue = sessionStorage.getItem(sessionItem);
    if (!sessionValue) {
      this.setSessionData(sessionItem, JSON.stringify({}));
    }
    sessionValue = sessionStorage.getItem(sessionItem);
    return JSON.parse(sessionValue);
  }
  setSessionData(sessionItem, sessionValue) {
    if (sessionValue instanceof Object) {
      return sessionStorage.setItem(sessionItem, JSON.stringify(sessionValue));
    }
    sessionStorage.setItem(sessionItem, sessionValue);
  }
  removeSessionData(sessionItem) {
    sessionStorage.removeItem(sessionItem);
  }
  getLocalData(localItem) {
    let localValue = localStorage.getItem(localItem);
    if (!localValue) {
      this.setLocalData(localItem, JSON.stringify({}));
    }
    localValue = localStorage.getItem(localItem);
    return JSON.parse(localValue);
  }
  setLocalData(localItem, localValue) {
    if (localValue instanceof Object) {
      return localStorage.setItem(localItem, JSON.stringify(localValue));
    }
    localStorage.setItem(localItem, localValue);
  }
  removeLocalData(localItem) {
    localStorage.removeItem(localItem);
  }
}

//拦截axios请求
axios.interceptors.request.use(
  function (config) {
    // 发送请求之前做一些事情
    _this.$toast.loading({
      duration: 0,
      forbidClick: true,
      loadingType: "spinner",
      mask: false,
      message: "加载中..."
    });
    return config;
  },
  function (error) {
    // 挂掉之后怎么处理
    return Promise.reject(error);
  }
);

let errorCatch = (code, msg) => {
  switch (code) {
    case 100002:
      _this.$router.push("/front/login");
      break;
    case 100012:
      _this.$router.push("/front/certification");
      break;
    case code:
      _this.$toast(msg || "接口404");
      break;
    default:
      _this.$toast("系统错误，请稍后重试");
      break;
  }
};

axios.interceptors.response.use(
  function (response) {
    // 数据成功返回之后
    _this.$toast.clear();
    if (response.data.code !== 0) {
      return Promise.reject({
        code: response.data.code,
        msg: errorcode[response.data.code] || response.data.msg
      });
    }
    return response;
  },
  function (error) {
    // 处理错误的内容
    _this.$toast.clear();
    // 如果错啦
    _this.$toast("请稍后再试");
  }
);

for (const key in reqAndUrl) {
  ApiService.prototype[key] = {};
  for (const url of reqAndUrl[key]) {
    let reqURL = url;
    let trueURL = url;
    if (Array.isArray(url)) {
      reqURL = url[0];
      trueURL = url[1];
    }
    ApiService.prototype[key][reqURL] = function (data, method = "post") {
      return axios[method](
          hostname + key + "/" + trueURL,
          method == "post" ? qs.stringify(data) : {
            params: data
          }
        )
        .then(res => {
          return res.data;
        })
        .catch(data => {
          errorCatch(data.code, data.msg);
          return Promise.reject(data);
        });
    };
  }
}

export default ApiService;