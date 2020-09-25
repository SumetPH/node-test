<template>
  <Layout>

    <div class="container">
      <div class="row">
        <div class="col s12 center-align">
          <h4 style="font-weight: bold;">
            Login
          </h4>
          <div style="border: 2px solid #747eac; width: 100px; display: inline-block;"></div>
        </div>
      </div>
      <div class="row">
        <div class="col s12 center-align">
          <p class="grey-text">
            Welcome back! Login for shopping for what you want.
          </p>
        </div>
      </div>
      <form @submit.prevent="login">
        <div class="row">
          <div class="col s12 m3"></div>
          <div class="col s12 m6 input-field">
            <label for="email">Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="col s12 m3"></div>
        </div>
        <div class="row">
          <div class="col s12 m3"></div>
          <div class="col s12 m6 input-field">
            <label for="password">Password</label>
            <input type="password" v-model="password" required />
          </div>
          <div class="col s12 m3"></div>
        </div>
        <div class="row">
          <div class="col s12 m3"></div>
          <div class="col s12 m6">
            <button class="btn"
              style="background-color: #747eac; width: 100%; height: 50px; border-radius: 18px; margin-bottom: 1rem;"
              type="submit">
              Continue
            </button>
            <button class="btn" style="background-color: #ab3034; width: 100%; height: 50px; border-radius: 18px;"
              @click.prevent="$router.push('/register')">
              Register
            </button>
          </div>
          <div class="col s12 m3"></div>
        </div>
      </form>

      <!-- <div>
      <a class="btn-facebook" href="/api/v1/user/login/facebook">Facebook</a>
    </div> -->
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  export default {
    components: { Layout },
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        this.axios
          .post("/api/v1/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            this.$store.dispatch("setToken", res.data.token).then(() => {
              this.$store.dispatch("fetchCart");
              window.M.toast({ html: "ล็อกอินสำเร็จ" });
              this.$router.push("/user/profile");
            });
          })
          .catch((err) => {
            window.M.toast({ html: err.response.data.message });
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