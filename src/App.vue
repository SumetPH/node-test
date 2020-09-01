<template>
  <div id="app" :style="{marginLeft: menuWidth}">
    <Nav :menu-width="menuWidth" :open-menu="openMenu"></Nav>
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
    Section
  },
  data() {
    return {
      menuWidth: "0px"
    };
  },
  methods: {
    openMenu() {
      if (this.menuWidth === "0px") {
        this.menuWidth = "200px";
      } else {
        this.menuWidth = "0px";
      }
    }
  }
};
</script>

<style>
#app {
  transition: 0.5s;
}
</style>
