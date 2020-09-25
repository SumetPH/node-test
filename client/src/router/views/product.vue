<template>
  <Layout>
    <div class="row">
      <div class="col xl3">
        <ProductFilter></ProductFilter>
      </div>
      <div class="col xl9">
        <ProductContent></ProductContent>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  import ProductFilter from "@/components/_product-filter.vue";
  import ProductContent from "@/components/_product-content.vue";
  export default {
    components: { Layout, ProductFilter, ProductContent },
    mounted() {
      this.axios.get("/api/v1/product").then((res) => {
        console.log(res, "mountedProduct");
        this.$store.commit("setProductsAll", res.data);
      });
    },
  };
</script>