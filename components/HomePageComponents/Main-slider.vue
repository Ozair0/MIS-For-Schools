<template>
  <div class="main-slider">
    <a href="#" class="H_Arr"><fa :icon="faChevronLeft" color="#663695" /></a>
    <div class="H_Ttitl_Button">
      <div class="Title_Text">
        <p class="T_one">KIS</p>
        <p class="T_two">Afghanistan’s first and<br />only digital school</p>
      </div>
      <a href="#" class="H_Button">Enroll Your Child</a>
    </div>
    <img class="H_image" src="/14.jpg" width="900px" alt="14" />
    <a href="#" class="H_Arr"><fa :icon="faChevronRight" color="#663695" /></a>
    <WhatKisOffer />
  </div>
</template>

<script>
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import WhatKisOffer from "~/components/HomePageComponents/What-Kis-Offer";
export default {
  components: { WhatKisOffer },

  computed: {
    faChevronLeft() {
      return faChevronLeft;
    },
    faChevronRight() {
      return faChevronRight;
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
</style>
