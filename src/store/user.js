const user = {
  state: {
    address: ""
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    }
  }
};

export default user;
