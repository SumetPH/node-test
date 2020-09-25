<template>
  <Layout>
    <div class="row">
      <div class="col s12">
        <h5>Products</h5>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <table class="responsive-table">
          <thead>
            <tr>
              <!-- <th>ID</th> -->
              <th style="width: 50%;">Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginate" :key="index">
              <!-- <td>{{ item._id }}</td> -->
              <td>
                <router-link :to="'/admin/product/edit/' + item._id">{{
                  item.name
                }}</router-link>
              </td>
              <td>{{ item.price }}</td>
              <td>
                <router-link v-if="item.images.length > 0" :to="'/admin/product/image/' + item._id">
                  <img class="responsive-img" style="height: 50px;" :src="'/' + item.images[0].path" alt="" />
                </router-link>
                <router-link v-else class="btn btn-small" :to="'/admin/product/image/' + item._id">
                  <i class="material-icons left">add</i>
                  Add</router-link>
              </td>
              <td>
                <button class="btn red btn-small" @click="deleteData(item._id)">
                  <i class="material-icons left">remove_circle</i>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <ul class="pagination">
        <li class="waves-effect">
          <a href="#!"><i class="material-icons" @click="prevPage">chevron_left</i></a>
        </li>
        <li class="active">
          <a href="#!">{{ pageNumber }}</a>
        </li>
        <li class="waves-effect">
          <a href="#!"><i class="material-icons" @click="nextPage">chevron_right</i></a>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/admin.vue'
  export default {
    components: { Layout },
    data() {
      return {
        products: [],
        pageNumber: 1,
        pageSize: 3,
      };
    },
    mounted() {
      this.fetchData();
      console.log(this.pageNumber);
    },
    computed: {
      paginate() {
        return this.products.slice(
          (this.pageNumber - 1) * this.pageSize,
          this.pageNumber * this.pageSize
        );
      },
    },
    methods: {
      fetchData() {
        this.axios.get("/api/v1/product").then((res) => {
          console.log(res);
          this.products = res.data;
        });
      },
      deleteData(_id) {
        if (confirm("คุณต้องการลบหรือไม่")) {
          this.axios.delete(`/api/v1/product/${_id}`).then((res) => {
            console.log(res);
            this.fetchData();
          });
        }
      },
      prevPage() {
        if (this.pageNumber > 1) {
          this.pageNumber -= 1;
        }
      },
      nextPage() {
        if (
          this.pageNumber + 1 <=
          Math.ceil(this.products.length / this.pageSize)
        ) {
          this.pageNumber += 1;
        }
      },
    },
  };
</script>