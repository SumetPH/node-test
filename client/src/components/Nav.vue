<template>
  <div>
    <div
      class="n-menu"
      :style="{ height: menuHeight, backgroundColor: '#322b32' }"
    >
      <ul class="menu">
        <li class="menu-item" @click="toggleMenu">
          <router-link to="/">Home</router-link>
        </li>
        <li class="menu-item" @click="toggleMenu">
          <router-link to="/product">Product</router-link>
        </li>
        <li class="menu-item" @click="toggleMenu">
          <a v-if="$store.state.token" href="#" @click="logout">Logout</a>
          <router-link v-else to="/login">Login</router-link>
        </li>
        <li class="menu-item" @click="toggleMenu">
          <router-link to="/admin/product">Admin</router-link>
        </li>
      </ul>
    </div>

    <div class="col" style="background-color: #7d5c47">
      <div class="row" style="margin: 0;">
        <div class="col s4">
          <i @click="toggleSearch" class="material-icons">search</i>
          <i @click="toggleMenu" class="material-icons">menu</i>
        </div>
        <div class="col s4 center-align" style="padding-top: 10px;">
          <router-link to="/"><strong>SumetPH</strong></router-link>
        </div>
        <div class="col s4 right-align">
          <router-link to="/profile">
            <i class="material-icons">person</i>
          </router-link>
          <router-link to="/cart">
            <i v-if="$store.state.token" class="material-icons"
              >shopping_cart
              <span v-if="$store.state.carts.length > 0" class="badge white">{{
                this.$store.state.carts.length
              }}</span>
            </i>
          </router-link>
        </div>
      </div>

      <div class="n-search" :style="{ height: searchHeight }">
        <div class="row">
          <div class="col s1"></div>
          <div class="col s10 input-field" style="margin:0;">
            <form @submit.prevent="search">
              <input
                class="center-align white-text"
                type="text"
                v-model="keyword"
              />
            </form>
          </div>
          <div class="col s1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuHeight", "toggleMenu", "searchHeight", "toggleSearch"],
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search() {
      this.$store.commit("setProductKeyword", this.keyword);
      this.toggleSearch();
      if (this.$route.path !== "/product") {
        this.$router.push("/product");
      }
    },
    logout() {
      this.$store.dispatch("removeToken");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  color: white;
}

i {
  cursor: pointer;
  color: white;
  padding: 10px;
}

.input-field input[type="text"]:focus {
  border-bottom: 1px solid yellowgreen;
}

.n-menu {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 0px;
  overflow: hidden;
  background-color: white;
  z-index: 1;
  transition: 0.5s;
}

.menu {
  display: flex;
  justify-content: center;
}

.menu-item {
  padding: 10px;
}

.n-search {
  height: 0px;
  overflow: hidden;
  transition: 0.5s;
}
</style>
