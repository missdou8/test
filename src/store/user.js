const user = {
  state: {
    name:"",   //用户名
    userInfo: {},
    address: "",
    subAddress: "",
    IDcard:"",      //存储身份证号
    frontPic:'',    //身份证正面照
    backPic:'',     //身份证反面照
    isLogin:false   //设置登录状态
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setName(state, name) {
      state.name = name;
    },
    setInfo(state, info) {
      state.userInfo = info;
    },
    setAddress(state, address) {
      state.address = address;
    },
    setSubAddress(state, subAddress) {
      state.subAddress = subAddress;
    },
    setIDcard(state, IDcard) {
      state.IDcard = IDcard;
    },
    setFrontPic(state, frontPic) {
      state.frontPic = frontPic;
    },
    setBackPic(state, backPic) {
      state.backPic = backPic;
    },
  }
};

export default user;
