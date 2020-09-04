<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h5>Filter</h5>
      </div>
    </div>

    <div class="row">
      <div class="col s12" style="padding: 10px 20px;">
        <strong>Category</strong>
      </div>
      <div class="col s12">
        <ul class="collection" style="border:0;">
          <form @change.prevent="categoryFilter">
            <li
              class="collection-item"
              v-for="(item, index) in categoryList"
              :key="index"
            >
              <label>
                <input
                  class="filled-in"
                  type="checkbox"
                  v-model="category"
                  :value="item"
                />
                <span>
                  {{ item }}
                </span>
              </label>
            </li>
          </form>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col s12" style="padding: 10px 20px;">
        <strong>Category</strong>
      </div>
      <div class="col s12 m6">
        <input
          class="form-control"
          type="number"
          @change="minMaxPrice"
          v-model="min"
          placeholder="ต่ำสุด"
          min="0"
        />
      </div>
      <div class="col s12 m6 p-1">
        <input
          type="number"
          @change="minMaxPrice"
          v-model="max"
          placeholder="สูงสุด"
          min="0"
        />
      </div>
    </div>

    <div class="row">
      <div class="col s12" style="padding: 10px 20px;">
        <strong>Tag</strong>
      </div>
      <div class="col s12">
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
        <div class="chip">Test</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [],
      min: "",
      max: "",
    };
  },
  mounted() {
    this.$store.commit("setProductCategory", []);
    this.$store.commit("setProductPrice", { min: 0, max: 0 });
  },
  computed: {
    categoryList() {
      const category = this.$store.state.products.all.map(
        (product) => product.category
      );
      return [...new Set(category)];
    },
  },
  methods: {
    categoryFilter() {
      this.$store.commit("setProductCategory", this.category);
    },
    minMaxPrice() {
      this.$store.commit("setProductPrice", {
        min: this.min === "" ? 0 : parseInt(this.min),
        max: this.max === "" ? 0 : parseInt(this.max),
      });
    },
  },
};
</script>
