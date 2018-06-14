import Index from "../views/user/index.vue";
import editImg from "../views/user/editImg.vue";
import editShop from "../views/user/editShop.vue";
import editName from "../views/user/editName.vue";
import editAutonym from "../views/user/editAutonym.vue";
import autonymTips from "../views/user/autonymTips.vue";
import editPlane from "../views/user/editPlane.vue";
import editPhone from "../views/user/editPhone.vue";
import editAddress from "../views/user/editAddress.vue";
import editPwd from "../views/user/editPwd.vue";

const USER_ROUTERS = [{
    path: "user/index",
    component: Index,
    meta: {
      title: "个人中心"
    }
  },
  {
    path: "user/edit/img",
    component: editImg,
    meta: {
      title: "修改用户头像"
    }
  },
  {
    path: "/user/edit/shop",
    name: "editShop",
    component: editShop,
    meta: {
      title: "修改商店名称"
    }
  },
  {
    path: "/user/edit/name",
    name: "editName",
    component: editName,
    meta: {
      title: "修改名称"
    }
  },
  {
    path: "/user/edit/autonym",
    name: "editAutonym",
    component: editAutonym,
    meta: {
      title: "实名认证"
    }
  }, 
  {
    path: "/user/edit/autonym/tips",
    name: "autonymTips",
    component: autonymTips,
    meta: {
      title: "实名认证协议"
    }
  },
  {
    path: "/user/edit/plane",
    name: "editPlane",
    component: editPlane,
    meta: {
      title: "修改商铺座机"
    }
  },
  {
    path: "/user/edit/phone",
    name: "editPhone",
    component: editPhone,
    meta: {
      title: "修改手机号"
    }
  },
  {
    path: "/user/edit/address",
    name: "editAddress",
    component: editAddress,
    meta: {
      title: "修改商铺地址"
    }
  },
  {
    path: "/user/edit/Pwd",
    name: "editPwd",
    component: editPwd,
    meta: {
      title: "修改密码"
    }
  }
];

export default USER_ROUTERS;