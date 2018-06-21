import fans from "../views/record/fans.vue";
import join from "../views/record/join.vue";
import like from "../views/record/like.vue";

const RECORD_ROUTERS = [{
    path: "user/record/fans",
    component: fans,
    meta: {
      title: "粉丝列表"
    }
  },
  {
    path: "user/record/join",
    component: join,
    meta: {
      title: "已报名列表"
    }
  },
  {
    path: "user/record/like",
    component: like,
    meta: {
      title: "点赞列表"
    }
  },
];

export default RECORD_ROUTERS;