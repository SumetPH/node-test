<template>
  <div class="p-3">
    <div class="col-12 text-center p-3">
      <h3>Add Image</h3>
    </div>
    <div class="row mb-3">
      <div class="col-lg-4 border" v-for="(item, index) in images" :key="index">
        <img class="img-fluid" :src="'/' + item.path" alt="" />
        <div class="row justify-content-center m-2">
          <button class="btn btn-sm btn-danger" @click="removeImage(item.id)">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupFileAddon01"
              >Upload</span
            >
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" @change="addImage" />
            <label class="custom-file-label" for="file">Choose file</label>
          </div>
        </div>
      </div>
      <div class="col-12 m-3">
        <router-link class="btn btn-primary" to="/admin/product"
          >Back</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
      images: [],
      image: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios.get(`/api/v1/product/${this.$route.params.id}`).then((res) => {
        console.log(res);
        this.product = res.data.product;
        this.images = res.data.product.images;
      });
    },
    addImage(e) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      this.axios
        .post(`/api/v1/product/image/${this.product.id}`, formData)
        .then((res) => {
          console.log(res);
          this.fetchData();
        });
    },
    removeImage(id) {
      this.axios.delete(`/api/v1/product/image/${id}`).then((res) => {
        console.log(res);
        this.fetchData();
      });
    },
  },
};
</script>
