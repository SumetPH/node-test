<template>
  <div>
    <button :data-target="order._id" class="btn modal-trigger">แจ้งชำระ</button>
    <small v-if="order.transfer_image" style="display:block; margin-top: 1rem;"
      >แจ้งชำระเมื่อ : {{ new Date(order.updated_at).toLocaleString() }}</small
    >

    <div :id="order._id" class="modal" ref="modal">
      <div class="modal-content">
        <h5>Order : {{ order._id }}</h5>
        <form action="#">
          <div class="file-field input-field">
            <div class="btn">
              <span>เลือก</span>
              <input type="file" ref="image" />
            </div>
            <div class="file-path-wrapper">
              <input
                class="file-path validate"
                type="text"
                placeholder="หลักฐานการโอน"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="text-align: center;">
        <a
          href="#!"
          class="modal-close waves-effect waves-green btn"
          @click="submit"
          >แจ้งชำระ</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  mounted() {
    window.M.Modal.init(this.$refs.modal);
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append("image", this.$refs.image.files[0]);
      this.axios
        .put(`/api/v1/order/transfer/${this.order._id}`, formData)
        .then((res) => {
          console.log(res);
          this.$store.dispatch("fetchOrder");
          window.M.toast({ html: "แจ้งชำระเรียบร้อย" });
        })
        .catch((err) => {
          console.log(err.response);
          window.M.toast({ html: err.response.data.message });
        });
    },
  },
};
</script>
