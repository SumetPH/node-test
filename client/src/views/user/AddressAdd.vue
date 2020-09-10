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
          <textarea
            class="materialize-textarea"
            name="address"
            v-model="address.address"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6  ">
          <label for="province">จังหวัด</label>
          <select
            ref="provinceSelect"
            @change="getDistrict"
            v-model="provinceSelect"
          >
            <option value="" disabled selected>เลือก</option>
            <option
              v-for="(item, index) in province"
              :key="index"
              :value="item"
              >{{ item }}</option
            >
          </select>
        </div>
        <div class="col s12 l6">
          <label for="district">อำเภอ</label>
          <select
            ref="districtSelect"
            @change="getZip"
            v-model="districtSelect"
          >
            <option value="" disabled selected>เลือก</option>
            <option
              v-for="(item, index) in district"
              :key="index"
              :value="item"
              >{{ item }}</option
            >
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col s12 l6">
          <label for="zip">รหัสไปรษณีย์</label>
          <select ref="zipcodeSelect" v-model="zipcodeSelect">
            <option value="" disabled selected>เลือก</option>
            <option
              v-for="(item, index) in zipcode"
              :key="index"
              :value="item"
              >{{ item }}</option
            >
          </select>
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
import Layout from "./Layout.vue";
import { address } from "../../assets/address";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      address: [],
      province: [],
      provinceSelect: "",
      district: [],
      districtSelect: "",
      zipcode: [],
      zipcodeSelect: "",
    };
  },
  mounted() {
    this.getProvince();
    window.M.FormSelect.init(this.$refs.provinceSelect);
    window.M.FormSelect.init(this.$refs.districtSelect);
    window.M.FormSelect.init(this.$refs.zipcodeSelect);
  },

  methods: {
    getProvince() {
      const p = new Promise((res) => {
        const province = [...new Set(address.map((item) => item.province))];
        this.province = province;
        res();
      });

      p.then(() => {
        window.M.FormSelect.init(this.$refs.provinceSelect);
      });
    },
    getDistrict() {
      const p = new Promise((res) => {
        const amphoe = address
          .filter((item) => item.province === this.provinceSelect)
          .map((item) => item.amphoe);
        this.district = [...new Set(amphoe)];
        res();
      });

      p.then(() => {
        window.M.FormSelect.init(this.$refs.districtSelect);
      });
    },
    getZip() {
      const p = new Promise((res) => {
        const zipcode = address
          .filter((item) => item.province === this.provinceSelect)
          .map((item) => item.zipcode);
        this.zipcode = [...new Set(zipcode)];
        res();
      });

      p.then(() => {
        window.M.FormSelect.init(this.$refs.zipcodeSelect);
      });
    },
    save() {
      this.axios
        .post(`/api/v1/address`, {
          name: this.address.name,
          address: this.address.address,
          district: this.districtSelect,
          province: this.provinceSelect,
          zip: this.zipcodeSelect,
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
