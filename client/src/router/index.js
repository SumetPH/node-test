import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const isAuth = (to, from, next) => {
  if (localStorage.getItem("token") === null) next({ name: "Login" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    beforeEnter: isAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },

  {
    path: "/admin/product",
    name: "AdminProduct",
    component: () => import("../views/admin/product/Product.vue"),
  },
  {
    path: "/admin/product/add",
    name: "AdminProductAdd",
    component: () => import("../views/admin/product/Add.vue"),
  },
  {
    path: "/admin/product/:id",
    name: "AdminProductEdit",
    component: () => import("../views/admin/product/Edit.vue"),
  },
  {
    path: "/admin/product/image/:id",
    name: "AdminProductImage",
    component: () => import("../views/admin/product/Image.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
