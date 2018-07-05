const user = {
  state: {
    userInfo: {},
    address: "",
    subAddress: ""
  },
  mutations: {
    setInfo(state, info) {
      state.userInfo = info;
    },
    setAddress(state, address) {
      state.address = address;
    },
    setSubAddress(state, subAddress) {
      state.subAddress = subAddress;
    }
  }
};

export default user;
