<template>
  <div id="app" :style="{ marginTop: menuHeight }">
    <Navbar :menu-height="menuHeight" :toggle-menu="toggleMenu" :search-height="searchHeight"
      :toggle-search="toggleSearch"></Navbar>
    <Section>
      <slot></slot>
    </Section>
  </div>
</template>

<script>
  import Navbar from "@/components/_layout-main-navbar"
  import Section from "@/components/_layout-main-section";

  export default {
    components: { Navbar, Section },
    data() {
      return {
        menuHeight: "0px",
        searchHeight: "0px",
      };
    },
    mounted() {
      this.$store.dispatch("checkUser").then(() => {
        if (this.$store.state.token) {
          this.$store.dispatch("fetchCart");
        }
      });
    },
    methods: {
      toggleMenu() {
        if (this.menuHeight === "0px") {
          this.menuHeight = "60px";
        } else {
          this.menuHeight = "0px";
        }
      },
      toggleSearch() {
        if (this.searchHeight === "0px") {
          this.searchHeight = "60px";
        } else {
          this.searchHeight = "0px";
        }
      },
    },
  };
</script>

<style>
  * {
    font-family: "Grandstander", cursive;
  }

  #app {
    transition: 0.5s;
  }

  .a-color {
    color: #be985f !important;
  }

  .input-field input[type="text"]:focus {
    border-bottom: 1px solid #747eac !important;
    box-shadow: 0 1px 0 0 #747eac !important;
  }

  .input-field input[type="password"]:focus {
    border-bottom: 1px solid #747eac !important;
    box-shadow: 0 1px 0 0 #747eac !important;
  }

  .select-wrapper {
    padding-right: 2rem !important;
  }
</style>