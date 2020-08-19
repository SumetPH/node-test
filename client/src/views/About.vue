<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(localStorage.getItem("token"));
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("Login");
    }
  }
};
</script>
