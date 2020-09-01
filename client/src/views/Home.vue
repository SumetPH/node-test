<template>
  <div>
    <div class="row">
      <div class="col-md-8 head-one" style="height: 300px;"></div>
      <div class="col-md-4 head-two" style="height: 300px;"></div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <AsideFilter></AsideFilter>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="border-left" style="height: 65px;">
            <div class="col-md-6">
              <h5 class="p-3">Head</h5>
            </div>
          </div>
        </div>
        <Content></Content>
      </div>
    </div>
  </div>
</template>

<script>
import AsideFilter from "../components/AsideFilter";
import Content from "../components/Content";
export default {
  components: {
    AsideFilter,
    Content,
  },
};
</script>

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
