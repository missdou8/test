import Index from "../views/match/Index.vue";
import Detail from "../views/match/Detail.vue";
import Create from "../views/match/Create.vue";
import MatchStyle from "../views/match/MatchStyle.vue";
import Prize from "../views/match/Prize.vue";

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
  },
  {
    path: "match/style",
    component: MatchStyle,
    meta: {
      title: "赛制设置"
    }
  }
];

export default MATCH_ROUTERS;
