import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    products: {
      all: [],
      keyword: "",
      category: [],
      min: 0,
      max: 0,
    },
    carts: [],
    address: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProductsAll(state, products) {
      state.products.all = products;
    },
    setProductKeyword(state, keyword) {
      state.products.keyword = keyword;
    },
    setProductCategory(state, category) {
      state.products.category = category;
    },
    setProductPrice(state, { max, min }) {
      state.products.min = min;
      state.products.max = max;
    },
    setCart(state, carts) {
      state.carts = carts;
    },
    setAddress(state, address) {
      state.address = address;
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
    fetchCart(context) {
      axios.get("/api/v1/cart").then((res) => {
        context.commit("setCart", res.data);
      });
    },
    fetchAddress(context) {
      axios.get("/api/v1/address").then((res) => {
        context.commit("setAddress", res.data);
      });
    },
  },
  modules: {},
});
