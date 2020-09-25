<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h5>ที่อยู่ในการจัดส่ง</h5>
        </div>
      </div>
      <div class="row">
        <div class="col s12 input-field">
          <label for="name">ชื่อ-สกุล</label>
          <input type="text" v-model="address.name" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12 input-field">
          <label for="address">ที่อยู่</label>
          <textarea class="materialize-textarea" name="address" v-model="address.address"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6 input-field">
          <label for="district">อำเภอ</label>
          <input type="text" v-model="address.district" required />
        </div>
        <div class="col s12 l6 input-field">
          <label for="province">จังหวัด</label>
          <input type="text" v-model="address.province" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6 input-field">
          <label for="zip">รหัสไปรษณีย์</label>
          <input type="text" v-model="address.zip" required />
        </div>
        <div class="col s12 l6 input-field">
          <label for="phone">เบอร์โทรศัพท์</label>
          <input type="number" v-model="address.phone" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button @click="save" class="btn waves-effect light">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/user.vue'
  export default {
    components: { Layout },
    data() {
      return {
        address: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.axios
          .get(`/api/v1/address/${this.$route.params.id}`)
          .then((res) => {
            console.log(res, "address");
            this.address = res.data;
          })
          .then(() => {
            window.M.updateTextFields();
          });
      },
      save() {
        this.axios
          .put(`/api/v1/address/${this.address._id}`, {
            name: this.address.name,
            address: this.address.address,
            district: this.address.district,
            province: this.address.province,
            zip: this.address.zip,
            phone: this.address.phone,
          })
          .then(() => {
            window.M.toast({ html: "บันทักสำเร็จ" });
            this.$store.dispatch("fetchAddress");
            this.$router.back();
          })
          .catch((err) => {
            console.log(err.response);
            window.M.toast({ html: "บันทักไม่สำเร็จ" });
          });
      },
    },
  };
</script>