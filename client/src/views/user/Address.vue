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
          <input type="text" v-model="name" :disabled="disabled" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12 input-field">
          <label for="address">ที่อยู่</label>
          <textarea
            class="materialize-textarea"
            name="address"
            v-model="address"
            :disabled="disabled"
            required
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6 input-field">
          <label for="district">อำเภอ</label>
          <input type="text" v-model="district" :disabled="disabled" required />
        </div>
        <div class="col s12 l6 input-field">
          <label for="province">จังหวัด</label>
          <input type="text" v-model="province" :disabled="disabled" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6 input-field">
          <label for="zip">รหัสไปรษณีย์</label>
          <input type="text" v-model="zip" :disabled="disabled" required />
        </div>
        <div class="col s12 l6 input-field">
          <label for="phone">เบอร์โทรศัพท์</label>
          <input type="number" v-model="phone" :disabled="disabled" required />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button
            v-if="disabled"
            @click="disabled = false"
            class="btn waves-effect light"
          >
            แก้ไข
          </button>
          <button v-else @click="save" class="btn waves-effect light">
            บันทึก
          </button>
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
  data() {
    return {
      disabled: true,
      id: false,
      name: "",
      address: "",
      district: "",
      province: "",
      zip: "",
      phone: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios
        .get("/api/v1/address")
        .then((res) => {
          console.log(res, "address");
          if (res.data.address.length > 0) {
            this.id = res.data.address[0].id;
            this.name = res.data.address[0].name;
            this.address = res.data.address[0].address;
            this.district = res.data.address[0].district;
            this.province = res.data.address[0].province;
            this.zip = res.data.address[0].zip;
            this.phone = res.data.address[0].phone;
          }
        })
        .then(() => {
          window.M.updateTextFields();
        });
    },
    save() {
      if (this.id) {
        this.axios
          .put(`/api/v1/address/${this.id}`, {
            name: this.name,
            address: this.address,
            district: this.district,
            province: this.province,
            zip: this.zip,
            phone: this.phone,
          })
          .then(() => {
            window.M.toast({ html: "บันทักสำเร็จ" });
            this.disabled = true;
            this.$store.dispatch("updateAddress");
          })
          .catch((err) => {
            console.log(err);
            window.M.toast({ html: "บันทักไม่สำเร็จ" });
          });
      } else {
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
            this.disabled = true;
            this.$store.dispatch("updateAddress");
          })
          .catch((err) => {
            console.log(err);
            window.M.toast({ html: "บันทักไม่สำเร็จ" });
          });
      }
    },
  },
};
</script>
