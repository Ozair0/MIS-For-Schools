<template>
  <fragment>
    <div class="Upper_Page">
      <MainSlider />
    </div>
    <div class="Bottom_Page">
      <Benefits />
      <AboutUS />
    </div>
  </fragment>
</template>

<script>
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Menu from "~/components/HomePageComponents/Menu.vue";
import MainSlider from "~/components/HomePageComponents/Main-slider";
import Benefits from "~/components/HomePageComponents/Benefits";
import AboutUS from "~/components/HomePageComponents/AboutUS";
import Footer from "~/components/HomePageComponents/Footer";
// import { Fragment } from "vue-fragment";
export default {
  components: { Footer, AboutUS, Benefits, MainSlider, Menu },
  layout: "public",
  computed: {
    faAngleDown() {
      return faAngleDown;
    }
  }
};
</script>

<style lang="scss">
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
