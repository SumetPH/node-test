<template>
  <Layout>
    <div class="row">
      <div class="col s12 l3">
        <ul class="collection with-header" style="border: 0;">
          <li class="collection-header">
            <h6>รายการ</h6>
          </li>
          <li class="collection-item">
            <router-link to="/user/profile">ข้อมูลส่วนตัว</router-link>
          </li>
          <li class="collection-item">
            <router-link to="/user/order">คำสั่งซื้อ</router-link>
          </li>
          <li class="collection-item">
            <router-link to="/user/address">ที่อยู่</router-link>
          </li>
        </ul>
      </div>
      <div class="col s12 l9">
        <slot></slot>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  export default {
    components: { Layout }
  }
</script>