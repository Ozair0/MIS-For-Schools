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
.MainHome {
  display: flex;
  flex-direction: column;
  .Upper_Page {
    background-color: #66cc00;
    height: auto;
  }
  .Bottom_Page {
    overflow-x: hidden;
  }
}

@media only screen and (max-width: 330px) {
  .MainHome {
    .Bottom_Page {
      margin-top: 40px;
    }
  }
}
</style>
