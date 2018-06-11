import Vue from "vue";
import router from "./router/router.js";
import App from "./App.vue";
// 公共css
import "lpreset.css";
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
