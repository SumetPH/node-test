<template>
  <div>
    <div class="row">
      <div class="col-xl-8 head-one" style="height: 300px;"></div>
      <div class="col-xl-4 head-two" style="height: 300px;"></div>
    </div>
    <div class="row">
      <div class="col-12 pt-3 d-flex justify-content-between">
        <b>สินค้า</b>
        <router-link to="/product">ดูทั้งหมด</router-link>
      </div>
      <div
        class="col-lg-4 col-xl-3 p-3"
        v-for="(item, index) in [0, 1, 2, 3]"
        :key="index"
      >
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
              <button
                class="btn btn-warning"
                style="border-radius: 18px; width: 120px;"
              >
                Show
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head-one {
  background: url("https://images.droidsans.com/wp-content/uploads/2019/08/cover-intel-tiger-lake.jpg");
  background-size: cover;
  background-position: center;
}

.head-two {
  background: url("https://www.iphone-droid.net/wp-content/uploads/2020/06/macOS-Big-Sur.png");
  background-size: cover;
  background-position: center;
}
</style>
