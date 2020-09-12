<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h5>Add Image</h5>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <a style="color: #334043;" href @click.prevent="$router.back()">
          &lt; Back</a
        >
      </div>
      <div class="col s6 right-align">
        <button class="btn-upload" @click="$refs.upload.click()">
          Upload
        </button>
        <input ref="upload" v-show="false" type="file" @change="addImage" />
      </div>
    </div>
    <div class="row">
      <div
        class="col l4 img-group "
        v-for="(item, index) in images"
        :key="index"
      >
        <img class="responsive-img" :src="'/' + item.path" alt="" />
        <button
          class="btn btn-small red btn-remove"
          @click="removeImage(item._id)"
        >
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
      images: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios.get(`/api/v1/product/${this.$route.params.id}`).then((res) => {
        console.log(res, "fetchData");
        this.product = res.data;
        this.images = res.data.images;
      });
    },
    addImage(e) {
      console.log(e);
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      this.axios
        .post(`/api/v1/product/image/${this.product._id}`, formData)
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

<style scoped>
.btn-upload {
  padding: 10px 30px;
  background-color: black;
  color: white;
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 5px 10px gray;
}

.img-group {
  position: relative;
  padding: 8px;
}

.btn-remove {
  position: absolute;
  top: 8%;
  right: 5%;
}
</style>
