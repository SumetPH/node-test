<template>
  <Layout>
    <div class="col-12 p-3 text-center">
      <h3>Edit Product</h3>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" class="form-control" v-model="category" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" class="form-control" v-model="price" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input type="number" class="form-control" v-model="quantity" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            rows="10"
            v-model="description"
          ></textarea>
        </div>
      </div>
      <div class="col-md-12">
        <button class="btn btn-success" @click="submit">Update</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layout.vue";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      id: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    };
  },
  mounted() {
    this.axios.get(`/api/v1/product/${this.$route.params.id}`).then((res) => {
      console.log(res);
      this.id = res.data.product.id;
      this.name = res.data.product.name;
      this.category = res.data.product.category;
      this.price = res.data.product.price;
      this.quantity = res.data.product.quantity;
      this.description = res.data.product.description;
    });
  },
  methods: {
    submit() {
      this.axios
        .put(`/api/v1/product/${this.id}`, {
          name: this.name,
          category: this.category,
          price: this.price,
          quantity: this.quantity,
          description: this.description,
        })
        .then((res) => {
          console.log(res.data);
          this.$router.back();
        });
    },
  },
};
</script>
