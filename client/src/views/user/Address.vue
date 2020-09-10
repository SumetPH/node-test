<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h5>ที่อยู่ในการจัดส่ง</h5>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <thead>
              <tr>
                <th style="width: 60%;">ที่อยู่</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in $store.state.address" :key="index">
                <td>
                  {{ item.name }} {{ item.address }} {{ item.district }}
                  {{ item.province }} {{ item.zip }} {{ item.phone }}
                </td>
                <td>
                  <router-link :to="'/user/address/edit/' + item._id"
                    >แก้ไข</router-link
                  >
                </td>
                <td>
                  <a href @click.prevent="deleteAddress(item._id)">ลบ</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <router-link class="btn waves-effect light" to="/user/address/add"
            >เพิ่มที่อยู่</router-link
          >
        </div>
      </div>
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
    this.$store.dispatch("fetchAddress");
  },
  methods: {
    deleteAddress(id) {
      this.axios
        .delete(`/api/v1/address/${id}`)
        .then((res) => {
          console.log(res, "address.vue");
          window.M.toast({ html: "ลบสำเร็จ" });
          this.$store.dispatch("fetchAddress");
        })
        .catch((err) => {
          console.log(err.response, "address.vue");
          window.M.toast({ html: "ลบไม่สำเร็จ" });
        });
    },
  },
};
</script>
