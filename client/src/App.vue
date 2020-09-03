<template>
  <div id="app" :style="{ marginTop: menuHeight }">
    <Nav
      :menu-height="menuHeight"
      :toggle-menu="toggleMenu"
      :search-height="searchHeight"
      :toggle-search="toggleSearch"
    ></Nav>
    <Section>
      <router-view />
    </Section>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Section from "./components/Section";

export default {
  components: {
    Nav,
    Section,
  },
  data() {
    return {
      menuHeight: "0px",
      searchHeight: "0px",
    };
  },
  mounted() {
    this.$store.dispatch("checkUser");
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
#app {
  transition: 0.5s;
}
</style>
