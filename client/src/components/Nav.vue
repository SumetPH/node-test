<template>
  <div>
    <div
      class="n-menu"
      :style="{ height: menuHeight, backgroundColor: '#2980b9' }"
    >
      <ul class="d-flex justify-content-center list-unstyled mt-4">
        <li class="mx-3" @click="toggleMenu">
          <router-link to="/">Home</router-link>
        </li>
        <li class="mx-3" @click="toggleMenu">
          <router-link to="/product">Product</router-link>
        </li>
        <li class="mx-3" @click="toggleMenu">
          <a v-if="$store.state.token" href="#" @click="logout">Logout</a>
          <router-link v-else to="/login">Login</router-link>
        </li>
        <li class="mx-3" @click="toggleMenu">
          <router-link to="/about">About</router-link>
        </li>
        <li class="mx-3" @click="toggleMenu">
          <router-link to="/admin/product">Admin</router-link>
        </li>
      </ul>
    </div>

    <div class="col-12" style="background-color: #2980b9">
      <div class="row">
        <div class="col-4">
          <div class="d-flex">
            <div class="n-link" @click="toggleSearch">
              <i class="fas fa-search"></i>
            </div>
            <div class="n-link">
              <i class="fas fa-bars" @click="toggleMenu"></i>
            </div>
          </div>
        </div>
        <div class="col-4 text-center">
          <router-link to="/">
            <strong class="pt-3 d-block text-white"
              >SumetPH</strong
            ></router-link
          >
        </div>
        <div class="col-4">
          <div class="d-flex justify-content-end">
            <div class="n-link">
              <router-link to="/about">
                <i class="fas fa-user"></i
              ></router-link>
            </div>
            <div v-if="$store.state.token" class="n-link">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="n-search" :style="{ height: searchHeight }">
            <div class="form-group">
              <input type="text" class="form-control text-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuHeight", "toggleMenu", "searchHeight", "toggleSearch"],
  methods: {
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

.n-link {
  padding: 1rem;
  color: white;
}

.n-search {
  height: 0px;
  overflow: hidden;
  transition: 0.5s;
}
</style>
