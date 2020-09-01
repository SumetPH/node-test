<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get("/api/v1/user/check").then((res) => {
      console.log(res.data);
    });
  },
  methods: {
    logout() {
      this.$store.dispatch("removeToken");
      this.$router.push("/");
    },
  },
};
</script>
