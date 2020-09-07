<template>
  <div>
    <div class="row">
      <div class="col s12 l8">
        <div class="row">
          <div
            class="col s12"
            style="display: flex; justify-content: space-between; align-items: flex-end;"
          >
            <span style="font-size: 30px;">Shopping Cart</span>
            <span style="font-size: 20px;">{{ carts.length }} items</span>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <table class="responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th class="center-align">Quantity</th>
                  <th class="center-align">Price</th>
                  <th class="center-align">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="index">
                  <td style="width: 40%;">
                    <div class="row" style="margin: 0px;">
                      <div class="col s6">
                        <img
                          class="responsive-img"
                          :src="'/' + cart.images[0].path"
                          alt=""
                        />
                      </div>
                      <div class="col s6" style="margin-top: 1rem;">
                        <router-link :to="'/product/' + cart.product_id">{{
                          cart.name
                        }}</router-link>
                      </div>
                    </div>
                  </td>
                  <td style="width: 20%;">
                    <input
                      class="center-align"
                      style="font-size: 14px;"
                      type="number"
                      :value="cart.quantity"
                      @change="(e) => changeQuantity(e, cart.id)"
                    />
                  </td>
                  <td class="center-align">
                    {{ cart.price }}
                  </td>
                  <td class="center-align">
                    {{ cart.quantity * cart.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col s12 l4"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios.get("/api/v1/cart").then((res) => {
        console.log(res);
        this.carts = res.data.carts;
      });
    },
    changeQuantity(e, cart_id) {
      this.axios.post(`/api/v1/cart/`{
        product_id
      })
    },
  },
};
</script>
