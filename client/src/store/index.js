import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    products: {
      all: [],
      category: [],
      result: [],
    },
    filter: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProductsAll(state, products) {
      state.products.all = products;
    },
    setProductCategory(state, category) {
      state.products.category = category;
    },
  },
  actions: {
    checkUser(context) {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      context.commit("setToken", token);
    },
    setToken(context, token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      context.commit("setToken", token);
    },
    removeToken(context) {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      context.commit("setToken", null);
    },
  },
  modules: {},
});
