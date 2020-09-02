<template>
  <div>
    <div class="row">
      <div class="col-lg-2">
        <ul class="list-unstyled pt-5 pl-4">
          <li>
            Product
          </li>
          <ul>
            <li>
              <router-link to="/admin/product">ทั้งหมด</router-link>
            </li>
            <li>
              <router-link to="/admin/product/add">เพิ่ม</router-link>
            </li>
          </ul>
        </ul>
      </div>
      <div class="col-lg-10 p-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
