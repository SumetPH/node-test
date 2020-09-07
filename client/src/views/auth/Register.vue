<template>
  <div class="container">
    <div class="row">
      <div class="col s12 center-align">
        <h4 style="font-weight: bold;">
          Register
        </h4>
        <div
          style="border: 2px solid #747eac; width: 100px; display: inline-block;"
        ></div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 center-align">
        <p class="grey-text">
          Welcome back! Register for shopping for what you want.
        </p>
      </div>
    </div>
    <form @submit.prevent="register">
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
          <label for="username">Username</label>
          <input type="text" v-model="username" required />
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
          <button
            class="btn"
            style="background-color: #ab3034; width: 100%; height: 50px; border-radius: 18px;"
            type="submit"
          >
            Continue
          </button>
        </div>
        <div class="col s12 m3"></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      const l = this.$loading.show();
      this.axios
        .post(`/api/v1/user/register`, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          l.hide();
          if (res.status === 200) {
            this.$router.push("/login");
          } else {
            alert("Something wrong. Try again.");
          }
        });
    },
  },
};
</script>
