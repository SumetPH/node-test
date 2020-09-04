<template>
  <div>
    <div class="row" style="background-color: #7d5c47;">
      <div
        class="col s12 center-align white-text"
        style="height: 300px; padding-top: 2rem;"
      >
        <h4>My Shop Created by SumetPH.</h4>
      </div>
    </div>
    <div class="row">
      <div class="col s0 l2"></div>
      <div
        class="col s12 l8 white z-depth-1"
        style="margin-top: -150px; border-radius: 18px; padding: 2rem;"
      >
        <slot></slot>
      </div>
      <div class="col s0 l2"></div>
    </div>
    <div style="background-color: #efeaed; height: 300px; margin-top: -100px;">
      <div class="center-align" style="padding-top: 100px;">
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
