<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <input
          class="input"
          type="text"
          placeholder="Username"
          v-model="username"
        />
      </div>
      <div>
        <input
          class="input"
          type="text"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <button class="btn-local" type="submit">Login</button>
      </div>
    </form>
    <div>
      <a class="btn-facebook" href="/api/v1/user/login/facebook">Facebook</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    if (this.$route.query.token) {
      localStorage.setItem("token", this.$route.query.token);
      this.$router.push("/about");
    }
  },
  methods: {
    login() {
      this.axios
        .post("/api/v1/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch("setToken", res.data.token);
            this.$router.push("about");
          }
        });
    },
  },
};
</script>

<style scoped>
.input {
  border: 1px solid yellowgreen;
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
}

.btn-local {
  background-color: rgb(255, 119, 0);
  border: none;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 18px;
  width: 100px;
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
}

.btn-facebook {
  display: inline-block;
  background-color: rgb(68, 68, 230);
  border: 0;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 18px;
  width: 100px;
  font-size: 14px;
  text-decoration: none;
  box-sizing: border-box;
}
</style>
