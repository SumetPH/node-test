<template>
  <div class="row pb-5">
    <div
      v-for="item in [0, 1, 2, 3, 4, 5]"
      :key="item"
      class="col-lg-6 col-xl-4 p-0"
    >
      <div class="card">
        <img
          class="card-img-top"
          src="https://www.specnotebook.com/wp-content/uploads/2019/11/MacBook-Pro-16-silver-c.jpg"
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
</template>

<script>
export default {
  computed: {},
};
</script>

<style lang="scss" scoped></style>
