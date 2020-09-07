<template>
  <div>
    <div class="row">
      <div class="col s12 l8">
        <div class="row">
          <div class="col s12">
            <h5 style="display: flex; justify-content: space-between">
              Shopping Cart
              <span style="font-size: 18px;">{{ carts.length }} items</span>
            </h5>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col s12">
            <table>
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
                          :src="'/' + cart.image"
                          alt=""
                        />
                      </div>
                      <div class="col s6" style="margin-top: 1rem;">
                        <router-link :to="'/product/' + cart.product_id">{{
                          cart.name
                        }}</router-link>
                        <br />
                        <a @click.prevent="deleteCart(cart.id)" href="#">ลบ</a>
                      </div>
                    </div>
                  </td>
                  <td style="width: 20%;">
                    <input
                      class="center-align"
                      style="font-size: 14px;"
                      type="number"
                      min="1"
                      :value="cart.quantity"
                      @change="(e) => changeQuantity(cart.id, e.target.value)"
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
      <div class="col s12 l4">
        <div class="row">
          <div class="col s12">
            <h5 style="display: flex; justify-content: space-between">
              Order Summery
            </h5>
          </div>
        </div>
        <hr />
        <div class="row">
          <div
            class="col s12"
            style="display: flex; justify-content: space-between;"
          >
            <p>Items {{ carts.length }}</p>
            <p v-if="carts.length > 0">{{ sum }} Bath</p>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 ">
            <select ref="address">
              <option value="1">นาโพธิ์</option>
            </select>
            <label>Address</label>
          </div>
          <div class="input-field col s12 ">
            <select ref="shipping" v-model="shipping">
              <option value="50">ส่งด่วน + 50บาท</option>
              <option value="40">ส่งธรรมดา + 40บาท</option>
            </select>
            <label>Shipping</label>
          </div>
        </div>
        <div class="row" v-if="carts.length > 0">
          <div
            class="col s12"
            style="display: flex; justify-content: space-between;"
          >
            <span>สินค้า</span>
            <span>+ {{ sum }}</span>
          </div>
          <div
            class="col s12"
            style="display: flex; justify-content: space-between;"
          >
            <span>ค่าส่ง</span>
            <span>+ {{ shipping }}</span>
          </div>
          <div
            class="col s12"
            style="display: flex; justify-content: space-between;"
          >
            <b>รวม</b>
            <span>{{ parseInt(sum) + parseInt(shipping) }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button style="width: 100%" class="btn waves-effect light red">
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      shipping: 50,
    };
  },
  mounted() {
    this.fetchData();
    window.M.FormSelect.init(this.$refs.address);
    window.M.FormSelect.init(this.$refs.shipping);
  },
  computed: {
    sum() {
      return this.carts
        .map((cart) => cart.price * cart.quantity)
        .reduce((total, value) => total + value);
    },
  },
  methods: {
    fetchData() {
      this.axios.get("/api/v1/cart").then((res) => {
        console.log(res);
        this.carts = res.data.carts;
      });
    },
    deleteCart(cart_id) {
      this.axios.delete(`/api/v1/cart/${cart_id}`).then(() => {
        this.fetchData();
      });
    },
    changeQuantity(cart_id, quantity) {
      const l = this.$loading.show();
      this.axios
        .put(`/api/v1/cart/${cart_id}`, {
          quantity: quantity,
        })
        .then(() => {
          l.hide();
          this.fetchData();
        })
        .catch(() => {
          l.hide();
          alert("Something wrong!");
        });
    },
  },
};
</script>
