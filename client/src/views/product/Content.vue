<template>
  <div class="row pb-5">
    <div v-for="item in products" :key="item.id" class="col-lg-6 col-xl-4 p-0">
      <div class="card">
        <img
          v-if="item.images.length > 0"
          class="card-img-top"
          :src="'/' + item.images[0].path"
          alt
        />
        <div class="card-body">
          <h5>{{ item.name }}</h5>
          <p>{{ item.price }} Bath</p>
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
</template>

<script>
export default {
  props: ["products"],
};
</script>

<style lang="scss" scoped></style>
