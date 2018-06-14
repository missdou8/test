import Index from "../views/match/index.vue";
import Detail from "../views/match/Detail.vue";
import Create from "../views/match/Create.vue";

const MATCH_ROUTERS = [
  {
    path: "match",
    component: Index,
    meta: {
      title: "广告主"
    }
  },
  {
    path: "match/detail",
    component: Detail,
    meta: {
      title: "比赛详情"
    }
  },
  {
    path: "match/create",
    component: Create,
    meta: {
      title: "创建比赛"
    }
  }
];

export default MATCH_ROUTERS;
