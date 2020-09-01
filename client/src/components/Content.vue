<template>
  <div class="row pb-5">
    <div v-for="item in [0,1,2,3,4,5]" :key="item" class="col-md-4 p-0">
      <div class="card">
        <img
          class="card-img-top"
          src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141"
          alt
        />
        <div class="card-body">
          <h5>Test</h5>
          <p>500 Bath</p>
          <div class="row justify-content-center">
            <button class="btn btn-success" style="border-radius: 18px; width: 120px;">Show</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>