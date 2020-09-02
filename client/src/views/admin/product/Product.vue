<template>
  <Layout>
    <div class="col-12 p-3 text-center">
      <h3>Products</h3>
    </div>
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th style="width: 50%;">Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginate" :key="index">
            <td>{{ item.id }}</td>
            <td>
              <router-link :to="'/admin/product/' + item.id">{{
                item.name
              }}</router-link>
            </td>
            <td>{{ item.price }}</td>
            <td>
              <router-link
                v-if="item.images.length > 0"
                :to="'/admin/product/image/' + item.id"
              >
                <img
                  class="img-fluid"
                  style="height: 50px;"
                  :src="'/' + item.images[0].path"
                  alt=""
                />
              </router-link>
              <router-link
                v-else
                :to="'/admin/product/image/' + item.id"
                class="btn btn-info"
                >Add</router-link
              >
            </td>
            <td>
              <button class="btn btn-danger" @click="deleteData(item.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-12">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">{{ pageNumber }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "../Layout.vue";
export default {
  components: {
    Layout,
  },
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
        this.products = res.data.products;
      });
    },
    deleteData(id) {
      if (confirm("คุณต้องการลบหรือไม่")) {
        this.axios.delete(`/api/v1/product/${id}`).then((res) => {
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
