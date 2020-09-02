<template>
  <div class="container-fluid">
    <div class="row" style="background-color: #3498db;">
      <div class="col-md-12 text-center text-white pt-5" style="height: 300px;">
        <h4>My Shop Create by SumetPH.</h4>
        <p>🌏 || 🤩 || 🐙</p>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-top: -150px;">
      <div class="col-md-8 shadow bg-white">
        <slot></slot>
      </div>
    </div>
    <div class="row" style="background-color: #ecf0f1; margin-top: -100px;">
      <div
        class="col-md-12 text-center"
        style="height: 250px; margin-top: 180px;"
      >
        <h5>Welcome</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. saepe
          reprehenderit! Cum.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
