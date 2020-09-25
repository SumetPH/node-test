<template>
  <Layout>

    <div class="container">
      <div class="row">
        <div class="col s12" style="margin-top: 3rem; text-align: center;">
          <div class="row">
            <div class="col s12">
              <h5>Order : {{ this.$route.query.order_id }}</h5>
              <h5>ทำการสั่งซื้อสำเร็จ</h5>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <router-link class="btn waves-effect light" to="/user/order">เช็ครายการสั่งซื้อของท่าน</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  export default {
    components: { Layout },
    mounted() {
      this.$store.dispatch("fetchCart");
    },
  };
</script>