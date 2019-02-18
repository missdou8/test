import Vue from "vue";
import Vuex from "vuex";
import match from "./match.js";
import user from "./user.js";
import prizes from "./prizes.js";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  modules: {
    match,
    user,
    prizes
  },
  plugins: [vuexLocal.plugin]
});
