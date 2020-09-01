<template>
  <div style="background-color: #2980b9">
    <div class="n-menu" :style="{width: menuWidth}">
      <ul>
        <li @click="openMenu">
          <router-link to="/">Home</router-link>
        </li>
        <li @click="openMenu">
          <router-link to="/login">Login</router-link>
        </li>
        <li @click="openMenu">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-4 d-flex">
        <div class="n-link">
          <i class="fas fa-search"></i>
        </div>
        <div class="n-link">
          <i class="fas fa-bars" @click="openMenu"></i>
        </div>
      </div>
      <div class="col-4 text-center">
        <strong class="pt-3 d-block text-white">SumetPH</strong>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <div class="n-link">
          <i class="fas fa-user"></i>
        </div>
        <div class="n-link">
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuWidth", "openMenu"],
  mounted() {
    console.log(this.menuWidth);
  }
};
</script>

<style scoped>
i {
  cursor: pointer;
}

.n-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0px;
  overflow: hidden;
  background-color: white;
  z-index: 1;
  transition: 0.5s;
}

.n-link {
  padding: 1rem;
  color: white;
}
</style>
