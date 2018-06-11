import Vue from "vue";
import router from "./router/router.js";
import App from "./App.vue";
// 公共css
import "lpreset.css";
import "./style/base.css";
// 引用组件
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
