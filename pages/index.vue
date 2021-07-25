<template>
  <div v-frag>
    <div class="Upper_Page">
      <MainSlider />
    </div>
    <div class="Bottom_Page">
      <Benefits />
      <AboutUS />
    </div>
  </div>
</template>

<script>
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Menu from "~/components/Menu.vue";
import MainSlider from "~/components/HomePageComponents/Main-slider";
import Benefits from "~/components/HomePageComponents/Benefits";
import AboutUS from "~/components/HomePageComponents/AboutUS";
import Footer from "~/components/Footer";

export default {
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("showFooterImage/showHide", true);
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  components: { Footer, AboutUS, Benefits, MainSlider, Menu },
  layout: "public",
  computed: {
    faAngleDown() {
      return faAngleDown;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Upper_Page {
  background-color: #66cc00;
  height: auto;
}
.Bottom_Page {
  overflow-x: hidden;
}

@media only screen and (max-width: 330px) {
  .Bottom_Page {
    margin-top: 40px;
  }
}
</style>
