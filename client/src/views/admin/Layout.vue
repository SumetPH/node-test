<template>
  <div>
    <div class="row">
      <div class="col s12 l3">
        <ul class="collection with-header" style="border:0;">
          <li class="collection-header">
            <h6>สินค้า</h6>
          </li>
          <li class="collection-item">
            <router-link to="/admin/product">ทั้งหมด</router-link>
          </li>
          <li class="collection-item">
            <router-link to="/admin/product/add">เพิ่ม</router-link>
          </li>
        </ul>
      </div>
      <div class="col s12 l9">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
