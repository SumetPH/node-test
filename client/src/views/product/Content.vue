<template>
  <div class="row">
    <div v-for="product in products" :key="product.id" class="col l6 xl4">
      <div class="card">
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
          <a href="#">เพิ่ม</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      const { all, category } = this.$store.state.products;
      if (category.length === 0) {
        return all;
      } else {
        const filterProduct = all.filter((p) => {
          let product;
          category.forEach((c) => {
            if (c === p.category) {
              product = p;
            }
          });
          return product;
        });
        return filterProduct;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
