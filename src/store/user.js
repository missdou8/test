const user = {
  state: {
    name:"",   //用户名
    userInfo: {},
    address: "",
    subAddress: "",
    IDcard:"", //存储身份证号
    imgBox:{}, //身份证正反照
  },
  mutations: {
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
    /** 设置身份证照片
     *  typt  照片类型  frontPic正  backPic反 clear清空对象
     *  src   图片链接
     */
    setImgBox(state, type,src) {
      if(type === 'clear') state.imgBox = {}
      else state.imgBox[type] = src;
    }

  }
};

export default user;
