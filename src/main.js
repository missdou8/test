import Vue from "vue";
import router from "./router/router.js";
import App from "./App.vue";
import ApiService from "./service/http.js";
import store from "./store/index.js";
import ImageCompressor from "image-compressor.js";

// 导入公共CSS
import "lpreset.css";
import "./style/base.css";

//导入配置
import config from "./config/index.js";

Vue.prototype.config = config;

// 引用组件
import {
  Tab,
  Tabs,
  Field,
  Button,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Toast,
  List,
  PullRefresh,
  Dialog,
  Uploader,
  Area,
  Popup,
  Row,
  Col,
  Panel,
  Card,
  Collapse,
  NumberKeyboard,
  PasswordInput,
  DatetimePicker,
  Picker,
  CollapseItem,
  NavBar
} from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Toast)
  .use(List)
  .use(PullRefresh)
  .use(Dialog)
  .use(Uploader)
  .use(Area)
  .use(Popup)
  .use(Row)
  .use(Panel)
  .use(Card)
  .use(Col)
  .use(Collapse)
  .use(NumberKeyboard)
  .use(Picker)
  .use(DatetimePicker)
  .use(CollapseItem)
  .use(PasswordInput)
  .use(NavBar);

Vue.config.productionTip = false;

/**
 * 自定义全局方法
 */
Vue.prototype.http = new ApiService();
/**
 * 上传图片
 */
let uploadImg = (data, name, callBack) => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  var tarStr = "";
  for (let i in data) {
    tarStr += i + ":" + data[i].toString() + "\n";
  }
  alert(tarStr);
  alert(data);
  let formData = new FormData();
  formData.append("file", data, name);
  Vue.prototype.http.resource.uploadImg(formData, "post", config).then(res => {
    let data = res.data;
    callBack(data.src[0]);
  });
};

Vue.prototype.upload = (file, callBack) => {
  /**
   * 对图片进行压缩，如果图片小于200kb直接上传，如果大于等于200则压缩后再上传
   */
  let maxSize = 300 * 1024;
  let dataURI = file.content;
  let imgSize = dataURI.length;
  if (imgSize > maxSize) {
    let radio = maxSize / imgSize;
    new ImageCompressor(file.file, {
      quality: radio,
      convertSize: 1000000,
      success(newFile) {
        uploadImg(newFile, newFile.name, callBack);
      }
    });
    return;
  }
  let data = file.file;
  uploadImg(data, data.name, callBack);
};

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
