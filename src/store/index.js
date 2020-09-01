import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    checkUser(context) {
      const token = localStorage.getItem("token");
      context.commit("setToken", token);
    },
  },
  modules: {},
});
