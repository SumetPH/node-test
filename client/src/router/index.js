import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../views/product/Detail.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
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

router.beforeEach((to, _from, next) => {
  window.scrollTo(0, 0);
  switch (to.path) {
    case "/profile":
      localStorage.getItem("token") === null ? next({ name: "Login" }) : next();
      break;
    default:
      next();
  }
});

export default router;
