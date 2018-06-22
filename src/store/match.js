const match = {
  state: {
    id: "",
    time: "",
    attendPerson: "",
    type: "",
    rankPrize: [],
    sendStyle: "",
    sendAddress: "",
    ifSave: false
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setAttendPerson(state, num) {
      state.attendPerson = num;
    },
    setRankPrize(state, arr) {
      state.rankPrize = arr;
    },
    setIfSave(state, bl) {
      state.ifSave = bl;
    }
  }
};

export default match;
