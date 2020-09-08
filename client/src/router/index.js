import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/public/Home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("../views/public/Product.vue"),
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../views/public/ProductDetail.vue"),
  },
  {
    path: "/user/cart",
    name: "Cart",
    component: () => import("../views/user/Cart.vue"),
  },
  {
    path: "/user/profile",
    name: "Profile",
    component: () => import("../views/user/Profile.vue"),
  },
  {
    path: "/user/address",
    name: "UserAddress",
    component: () => import("../views/user/Address.vue"),
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
    component: () => import("../views/admin/Product.vue"),
  },
  {
    path: "/admin/product/add",
    name: "AdminProductAdd",
    component: () => import("../views/admin/ProductAdd.vue"),
  },
  {
    path: "/admin/product/:id",
    name: "AdminProductEdit",
    component: () => import("../views/admin/ProductEdit.vue"),
  },
  {
    path: "/admin/product/image/:id",
    name: "AdminProductImage",
    component: () => import("../views/admin/ProductImage.vue"),
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
