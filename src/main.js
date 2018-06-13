import Vue from "vue";
import router from "./router/router.js";
import App from "./App.vue";
import "./scripts/base.js";
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
  Dialog
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
  .use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
