<template>
  <Layout>
    <div class="about">
      <h1>This is an about page</h1>
      <button @click="logout">Logout</button>
    </div>
  </Layout>
</template>

<script>
import Layout from "./Layout.vue";
export default {
  components: {
    Layout,
  },
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
