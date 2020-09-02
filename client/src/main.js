import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
// if (process.env.NODE_ENV !== "production") {
//   axios.defaults.baseURL = "http://localhost:8000";
// }
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
