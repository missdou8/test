import VueRouter from "vue-router";
import App from "../App.vue";
import Vue from "vue";
//路由配置
import loginConfig from "./login.js";
import matchConfig from "./match.js";
import userConfig from "./user.js";
import recordConfig from "./record.js";

//组件
import Announcement from "../views/announcement/Announcement.vue";
import MailDetail from "../views/announcement/MailDetail.vue";
import NoticeDetail from "../views/announcement/NoticeDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    redirect: "/match",
    children: [].concat(loginConfig, matchConfig, userConfig, recordConfig)
  },
  {
    path: "/announce/index",
    component: Announcement,
    meta: {
      title: "公告/活动"
    }
  },
  {
    path: "/announce/detail/mail",
    component: MailDetail,
    meta: {
      title: "邮件详情"
    }
  },
  {
    path: "/announce/detail/notice",
    component: NoticeDetail,
    meta: {
      title: "公告详情"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/front/",
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
