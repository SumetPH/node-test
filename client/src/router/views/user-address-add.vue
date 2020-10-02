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
          <input type="text" v-model="name" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12 input-field">
          <label for="address">ที่อยู่</label>
          <textarea
            class="materialize-textarea"
            name="address"
            v-model="address"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6  input-field">
          <label for="province">จังหวัด</label>
          <input type="text" v-model="province" />
        </div>
        <div class="col s12 l6 input-field">
          <label for="district">อำเภอ</label>
          <input type="text" v-model="district" />
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6 input-field">
          <label for="zip">รหัสไปรษณีย์</label>
          <input type="number" v-model="zip" />
        </div>
        <div class="col s12 l6 input-field">
          <label for="phone">เบอร์โทรศัพท์</label>
          <input type="number" v-model="phone" required />
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
import Layout from "@/router/layouts/user.vue";
export default {
  components: { Layout },
  data() {
    return {
      name: "",
      address: "",
      province: "",
      district: "",
      zip: "",
      phone: "",
    };
  },

  methods: {
    save() {
      this.axios
        .post(`/api/v1/address`, {
          name: this.name,
          address: this.address,
          district: this.district,
          province: this.province,
          zip: this.zip,
          phone: this.phone,
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
