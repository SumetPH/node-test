<template>
  <Layout>
    <div class="row">
      <div class="col s12">
        <h5>Edit Product</h5>
      </div>
    </div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col s6">
          <a style="color: #334043;" href @click.prevent="$router.back()">
            &lt; Back</a
          >
        </div>
        <div class="col s6 right-align">
          <button class="btn btn-success" type="submit">
            <i class="material-icons left">save</i>
            Update
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m8 input-field">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" required />
        </div>
        <div class="col s12 m4 input-field">
          <label for="category">Category</label>
          <input type="text" class="form-control" v-model="category" required />
        </div>
        <div class="col s12 m6 input-field">
          <label for="price">Price</label>
          <input type="number" class="form-control" v-model="price" required />
        </div>
        <div class="col s12 m6 input-field">
          <label for="quantity">Quantity</label>
          <input
            type="number"
            class="form-control"
            v-model="quantity"
            required
          />
        </div>
        <div class="col s12">
          <label for="description">Description</label>
          <textarea
            class="materialize-textarea"
            rows="10"
            v-model="description"
            required
          ></textarea>
        </div>
      </div>
    </form>
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
      // M: this.M,
      id: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    };
  },
  mounted() {
    this.axios
      .get(`/api/v1/product/${this.$route.params.id}`)
      .then((res) => {
        console.log(res);
        this.id = res.data.product.id;
        this.name = res.data.product.name;
        this.category = res.data.product.category;
        this.price = res.data.product.price;
        this.quantity = res.data.product.quantity;
        this.description = res.data.product.description;
      })
      .then(() => {
        window.M.updateTextFields();
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
