<template>
  <Layout>
    <div class="row">
      <div class="col s12 l6">
        <div class="col s12" v-if="images.length > 0">
          <img @click="imagePreview(images[0].path)" class="responsive-img" :src="'/' + images[0].path" alt />
        </div>
        <div class="col s12">
          <div class="row">
            <div class="col s3" v-for="(image, index) in imagesFilter" :key="index">
              <img @click="imagePreview(image.path)" :src="'/' + image.path" alt class="responsive-img" />
            </div>
          </div>
        </div>
      </div>

      <div class="col s12 l6">
        <div class="row">
          <div class="col">
            <div>
              <h4>{{ product.name }}</h4>
            </div>
            <div>
              <div class="chip">{{ product.category }}</div>
              <span>เหลือ : {{ product.quantity }} ชิ้น</span>
            </div>
            <div>
              <h5>&#3647; {{ product.price }}</h5>
            </div>
            <div>
              <p>{{ product.description }}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12 input-field">
            <label for="quantity">จำนวน</label>
            <input type="number" min="0" v-model="quantity" />
          </div>
          <div class="col s12">
            <button @click="addToCart" class="btn black waves-effect waves-light">
              เพิ่มไปยังตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal" ref="modal">
      <div class="modal-content">
        <img class="responsive-img" :src="'/' + preview" alt />
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  export default {
    components: { Layout },
    data() {
      return {
        product: {},
        quantity: "1",
        images: [],
        preview: "",
      };
    },
    mounted() {
      this.axios
        .get(`/api/v1/product/${this.$route.params.id}`)
        .then((res) => {
          console.log(res, "detail");
          this.product = res.data;
          this.images = res.data.images;
        })
        .then(() => {
          window.M.updateTextFields();
        });
    },
    computed: {
      imagesFilter() {
        return this.images.filter((img, index) => index > 0);
      },
    },
    methods: {
      imagePreview(path) {
        this.preview = path;
        window.M.Modal.init(this.$refs.modal).open();
      },
      addToCart() {
        this.axios
          .post(`/api/v1/cart`, {
            product_id: this.product._id,
            name: this.product.name,
            price: this.product.price,
            quantity: this.quantity,
            image: this.images[0].path,
          })
          .then(() => {
            window.M.toast({ html: "เพิ่มสินค้าสำเร็จ" });
            this.$store.dispatch("fetchCart");
          })
          .catch(() => {
            this.$router.push("/login");
          });
      },
    },
  };
</script>