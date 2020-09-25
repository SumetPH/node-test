<template>
  <Layout>
    <div class="row">
      <div class="col s12 l8">
        <div class="row">
          <div class="col s12">
            <h5 style="display: flex; justify-content: space-between">
              Shopping Cart
              <span style="font-size: 18px;">{{ this.$store.state.carts.length }} items</span>
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
                <tr v-for="(cart, index) in $store.state.carts" :key="index">
                  <td style="width: 40%;">
                    <div class="row" style="margin: 0px;">
                      <div class="col s6">
                        <img class="responsive-img" :src="'/' + cart.image" alt="" />
                      </div>
                      <div class="col s6" style="margin-top: 1rem;">
                        <router-link :to="'/product/' + cart.product_id">{{
                          cart.name
                        }}</router-link>
                        <br />
                        <a @click.prevent="deleteCart(cart._id)" href="#">ลบ</a>
                      </div>
                    </div>
                  </td>
                  <td style="width: 20%;">
                    <input class="center-align" style="font-size: 14px;" type="number" min="1" :value="cart.quantity"
                      @change="(e) => changeQuantity(cart._id, e.target.value)" />
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
          <div class="col s12" style="display: flex; justify-content: space-between;">
            <p>Items {{ this.$store.state.carts.length }}</p>
            <p v-if="$store.state.carts.length > 0">{{ sum }} Bath</p>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 ">
            <div v-if="$store.state.address.length === 0" style="margin-top: 3rem;">
              <router-link to="/user/address">เพิ่มที่อยู่</router-link>
              <hr />
            </div>
            <select v-else ref="address" v-model="address_id">
              <option value="0" disabled selected>เลือก</option>
              <option v-for="(item, index) in $store.state.address" :key="index" :value="item._id">
                {{ item.address }}
              </option>
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
          <div class="input-field col s12 ">
            <select ref="payment" v-model="payment">
              <option value="ATM">ATM</option>
              <option value="เก็บเงินปลายทาง">เก็บเงินปลายทาง</option>
            </select>
            <label>Payment</label>
          </div>
        </div>
        <div class="row" v-if="$store.state.carts.length > 0">
          <div class="col s12" style="display: flex; justify-content: space-between;">
            <span>สินค้า</span>
            <span>+ {{ sum }}</span>
          </div>
          <div class="col s12" style="display: flex; justify-content: space-between;">
            <span>ค่าส่ง</span>
            <span>+ {{ shipping }}</span>
          </div>
          <div class="col s12" style="display: flex; justify-content: space-between;">
            <b>รวม</b>
            <span>{{ parseInt(sum) + parseInt(shipping) }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button @click="checkout" style="width: 100%" class="btn waves-effect light red"
              :disabled="$store.state.address.length === 0 || address_id === 0">
              สั่งซื้อสินค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/router/layouts/main.vue'
  export default {
    components: { Layout },
    data() {
      return {
        address_id: 0,
        shipping: 50,
        payment: "ATM",
      };
    },
    mounted() {
      this.$store.dispatch("fetchCart")
      this.$store.dispatch("fetchAddress")
      setTimeout(() => {
        window.M.FormSelect.init(this.$refs.address);
        window.M.FormSelect.init(this.$refs.shipping);
        window.M.FormSelect.init(this.$refs.payment);
      }, 1000);
    },
    computed: {
      sum() {
        return this.$store.state.carts
          .map((cart) => cart.price * cart.quantity)
          .reduce((total, value) => total + value);
      },
    },
    methods: {
      deleteCart(cart_id) {
        this.axios.delete(`/api/v1/cart/${cart_id}`).then(() => {
          this.$store.dispatch("fetchCart");
          window.M.toast({ html: "ลบสำเร็จ" });
        });
      },
      changeQuantity(cart_id, quantity) {
        this.axios
          .put(`/api/v1/cart/${cart_id}`, {
            quantity: quantity,
          })
          .then(() => {
            this.$store.dispatch("fetchCart");
            window.M.toast({ html: "สำเร็จ" });
          })
          .catch(() => {
            window.M.toast({ html: "Something wrong!" });
          });
      },
      checkout() {
        this.axios
          .post("/api/v1/order", {
            address_id: this.address_id,
            shipping: this.shipping,
            payment: this.payment,
            total: parseInt(this.sum) + parseInt(this.shipping)
          })
          .then((res) => {
            console.log(res, "cart.vue");
            this.$router.push({
              path: "/user/cart/confirm",
              query: { order_id: res.data._id },
            });
          })
          .catch((err) => {
            console.log(err.response);
            window.M.toast({ html: err.response.data.message });
          });
      },
    },
  };
</script>