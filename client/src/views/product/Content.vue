<template>
  <div>
    <div v-if="$store.state.products.keyword" class="row">
      <div class="col s12">
        <p>Search: {{ $store.state.products.keyword }}</p>
      </div>
    </div>
    <div v-if="products.length === 0" class="row">
      <div class="col s12 center-align">
        <h4 style="margin: 5rem 0">Not found.</h4>
      </div>
    </div>
    <div v-else class="row">
      <div v-for="product in products" :key="product.id" class="col l6 xl4">
        <router-link :to="'/product/' + product.id">
          <div class="card hoverable">
            <div class="card-image">
              <img
                v-if="product.images.length > 0"
                :src="'/' + product.images[0].path"
                alt
              />
            </div>
            <div class="card-content">
              <h5>{{ product.name }}</h5>
              <p>{{ product.price }} Bath</p>
            </div>
            <div class="card-action">
              <router-link class="a-color" :to="'/product/' + product.id">
                เพิ่ม
              </router-link>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      const { all, keyword, category, min, max } = this.$store.state.products;
      let filterProduct = all;
      // keyword
      if (keyword) {
        filterProduct = filterProduct.filter((product) =>
          product.name.includes(keyword)
        );
      }

      // category
      if (category.length) {
        filterProduct = filterProduct.filter((product) => {
          return category.includes(product.category);
        });
      }
      // MinPrice
      if (min > 0) {
        filterProduct = filterProduct.filter((product) => {
          return product.price >= min;
        });
      }
      // MaxPrice
      if (max > 0) {
        filterProduct = filterProduct.filter((product) => {
          return product.price <= max;
        });
      }
      // return
      return filterProduct;
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
.card-image {
  overflow: hidden;
}
img {
  transition: all 0.5s;
}
.card:hover img {
  transform: scale(1.2);
}
</style>
