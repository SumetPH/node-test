<template>
  <Layout>
    <div>
      <div class="row">
        <div class="col s12">
          <h5>คำสั่งซื้อ</h5>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <ul class="tabs" ref="tabs">
            <li class="tab col s3"><a href="#tab1">รอการชำระ</a></li>
            <li class="tab col s3">
              <a href="#tab2">รอการจัดส่ง</a>
            </li>
            <li class="tab col s3">
              <a href="#tab3">จัดส่งแล้ว</a>
            </li>
          </ul>
        </div>
        <div id="tab1" class="col s12" style="margin-top: 1rem;">
          <div v-for="(order, index) in $store.state.order" :key="index">
            <div v-if="order.status === 0" class="card">
              <div class="card-content">
                <p>
                  Order ID : {{ order._id }}
                  <br />
                  ชำระ : {{ order.payment }}
                  <br />
                  การจัดส่ง :
                  {{ order.shipping === 40 ? "ส่งธรรมดา" : "ส่งด่วน" }}
                  <br />
                  รวม : {{ order.total }} บาท
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>รูปภาพ</th>
                      <th>รายการ</th>
                      <th>จำนวน</th>
                      <th>ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in order.items" :key="index">
                      <td style="width: 20%;">
                        <img
                          class="responsive-img"
                          :src="'/' + item.image"
                          alt=""
                        />
                      </td>
                      <td>
                        {{ item.name }}
                      </td>
                      <td>
                        {{ item.quantity }}
                      </td>
                      <td>
                        {{ item.price }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Modal :order="order" style="margin-top: 1rem;"></Modal>
              </div>
            </div>
          </div>
        </div>
        <div id="tab2" class="col s12">Test 2</div>
        <div id="tab3" class="col s12">Test 3</div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/router/layouts/user.vue";
import Modal from "@/router/views/user-order-transfer.vue";

export default {
  components: {
    Layout,
    Modal,
  },
  mounted() {
    window.M.Tabs.init(this.$refs.tabs);
    this.$store.dispatch("fetchOrder");
  },
};
</script>
