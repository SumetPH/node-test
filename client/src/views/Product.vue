<template>
  <div>
    <div class="row">
      <div class="col-xl-2">
        <AsideFilter></AsideFilter>
      </div>
      <div class="col-xl-10">
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
import AsideFilter from "./product/AsideFilter";
import Content from "./product/Content";
export default {
  components: {
    AsideFilter,
    Content,
  },
};
</script>
