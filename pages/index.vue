<template>
  <div class="MainHome">
    <div class="Upper_Page">
      <Menu />
      <MainSlider />
    </div>
    <div class="Bottom_Page">
      <Benefits />
      <AboutUS />
    </div>
    <Footer />
  </div>
</template>

<script>
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Menu from "~/components/HomePageComponents/Menu.vue";
import MainSlider from "~/components/HomePageComponents/Main-slider";
import Benefits from "~/components/HomePageComponents/Benefits";
import AboutUS from "~/components/HomePageComponents/AboutUS";
import Footer from "~/components/HomePageComponents/Footer";
export default {
  components: {Footer, AboutUS, Benefits, MainSlider, Menu },
  layout: "public",
  computed: {
    faAngleDown() {
      return faAngleDown;
    },
  },
};
</script>

<style lang="scss">


.Upper_Page {
  background-color: #66cc00;
  height: 500px;
}
.MainHome {
  display: flex;
  flex-direction: column;
}
</style>
