<template>
  <div class="MainHome">
    <div class="Upper_Page">
      <Menu />
      <MainSlider />
    </div>
    <div class="Bottom_Page">
      <Benefits />
    </div>
  </div>
</template>

<script>
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Menu from "~/components/HomePageComponents/Menu.vue";
import MainSlider from "~/components/HomePageComponents/Main-slider";
import Benefits from "~/components/HomePageComponents/Benefits";
export default {
  components: { Benefits, MainSlider, Menu },
  layout: "public",
  computed: {
    faAngleDown() {
      return faAngleDown;
    },
  },
};
</script>

<style lang="scss">
.main-slider {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  width: 90%;
  margin: 0 auto;
  .H_Arr {
    padding: 8px 13px;
    background: rgba(102, 54, 149, 0.22);
    border-radius: 25px;
  }
  .H_image {
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
    border-radius: 9px;
    width: 600px;
    height: 360px;
    object-fit: cover;
  }
  .H_Ttitl_Button {
    display: flex;
    flex-direction: column;
    .Title_Text {
      .T_one {
        color: #663695;
        font-style: normal;
        font-weight: bold;
        font-size: 34px;
        margin: 0;
      }
      .T_two {
        color: white;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        margin-top: 0;
        margin-bottom: 1.5em;
      }
    }
    .H_Button {
      background: #663695;
      box-shadow: 3px 3px 12px #663695;
      border-radius: 80px;
      color: white;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      height: 48px;
      border: none;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.Upper_Page {
  background-color: #66cc00;
  height: 500px;
}
.MainHome {
  display: flex;
  flex-direction: column;
}
</style>
