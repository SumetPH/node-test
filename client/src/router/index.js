import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/router/views/home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/router/views/product.vue"),
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("@/router/views/product-detail.vue"),
  },
  {
    path: "/user/cart",
    name: "Cart",
    component: () => import("@/router/views/user-cart.vue"),
  },
  {
    path: "/user/cart/confirm",
    name: "UserCartConfirm",
    component: () => import("@/router/views/user-cart-confirm.vue"),
  },
  {
    path: "/user/profile",
    name: "Profile",
    component: () => import("@/router/views/user-profile.vue"),
  },
  {
    path: "/user/order",
    name: "UserOrder",
    component: () => import("@/router/views/user-order.vue"),
  },
  {
    path: "/user/address",
    name: "UserAddress",
    component: () => import("@/router/views/user-address.vue"),
  },
  {
    path: "/user/address/add",
    name: "UserAddressAdd",
    component: () => import("@/router/views/user-address-add.vue"),
  },
  {
    path: "/user/address/edit/:id",
    name: "UserAddressEdit",
    component: () => import("@/router/views/user-address-edit.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/router/views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/router/views/login.vue"),
  },
  {
    path: "/admin/product",
    name: "AdminProduct",
    component: () => import("@/router/views/admin-product.vue"),
  },
  {
    path: "/admin/product/add",
    name: "AdminProductAdd",
    component: () => import("@/router/views/admin-product-add.vue"),
  },
  {
    path: "/admin/product/edit/:id",
    name: "AdminProductEdit",
    component: () => import("@/router/views/admin-product-edit.vue"),
  },
  {
    path: "/admin/product/image/:id",
    name: "AdminProductImage",
    component: () => import("@/router/views/admin-product-image.vue"),
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
    case "/user/profile":
      localStorage.getItem("token") === null ? next({ name: "Login" }) : next();
      break;
    default:
      next();
  }
});

export default router;
