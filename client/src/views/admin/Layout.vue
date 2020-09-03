<template>
  <div>
    <div class="row">
      <div class="col s12 l3">
        <div class="row">
          <div class="col s12" style="padding: 10px 20px;">
            <strong>Product</strong>
          </div>
          <div class="col s12">
            <div class="collection" style="border:0;">
              <router-link class="collection-item" to="/admin/product"
                >ทั้งหมด</router-link
              >
              <router-link class="collection-item" to="/admin/product/add"
                >เพิ่ม</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 l9">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
