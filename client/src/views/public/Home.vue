<template>
  <div>
    <div class="row">
      <div class="col s12 xl8 head-one" style="height: 300px;"></div>
      <div class="col s12 xl4 head-two" style="height: 300px;"></div>
    </div>
    <div class="row">
      <div class="col s6">
        <b>สินค้า</b>
      </div>
      <div class="col s6 right-align">
        <router-link class="a-color" to="/product">ดูทั้งหมด</router-link>
      </div>
    </div>
    <div class="row">
      <div
        class="col s12 l4 xl3"
        v-for="(item, index) in [0, 1, 2, 3]"
        :key="index"
      >
        <div class="card z-depth-0">
          <div class="card-image">
            <img
              src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141"
              alt
            />
          </div>
          <div class="card-content">
            <h5>Test</h5>
            <p>500 Bath</p>
          </div>
          <div class="card-action">
            <a class="a-color" href="#">รายละเอียด</a>
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
