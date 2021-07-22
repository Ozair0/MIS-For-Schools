<template>
  <div class="main-slider">
    <a href="#" class="H_Arr"><fa :icon="faChevronLeft" color="#663695"/></a>
    <div class="H_Ttitl_Button">
      <div class="Title_Text">
        <p class="T_one">KIS</p>
        <p class="T_two">Afghanistan’s first and<br />only digital school</p>
      </div>
      <a href="#" class="H_Button">Enroll Your Child</a>
    </div>
    <nuxt-img
      format="webp"
      fit="cover"
      width="600"
      height="360"
      class="H_image"
      src="/14.jpg"
      alt="14"
    />
    <a href="#" class="H_Arr"><fa :icon="faChevronRight" color="#663695"/></a>
    <WhatKisOffer />
  </div>
</template>

<script>
import {
  faChevronLeft,
  faChevronRight
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
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.main-slider {
  overflow-x: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  width: 90%;
  margin: 0 auto;
  .H_Arr {
    padding: 8px 15px;
    background: rgba(102, 54, 149, 0.22);
    border-radius: 25px;
  }
  .H_image {
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
    border-radius: 9px;
    max-width: 600px;
  }
  .H_Ttitl_Button {
    display: flex;
    flex-direction: column;
    .Title_Text {
      .T_one {
        color: #663695;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        margin: 0;
      }
      .T_two {
        color: white;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
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
      font-size: 22px;
      height: 48px;
      border: none;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .main-slider {
    .H_image {
      height: 310px;
      max-width: 450px;
    }
    .H_Ttitl_Button {
      .Title_Text {
        .T_one {
          font-size: 25px;
        }
        .T_two {
          font-size: 18px;
        }
      }
      .H_Button {
        font-size: 15px;
        height: 38px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .main-slider {
    width: 100%;
    .H_Ttitl_Button {
      position: absolute;
      z-index: 9999;
      margin-right: 230px;
      margin-bottom: 25px;
      .Title_Text {
        background: rgba(0, 0, 0, 0.6);
        border-radius: 12px;
        padding: 6px;
        .T_one {
          color: #9e54e5;
        }
        .T_two {
          margin: 0;
        }
      }
      .H_Button {
        margin-top: 110px;
      }
    }
  }
}
@media only screen and (max-width: 550px) {
  .main-slider {
    .H_image {
      height: 270px;
      max-width: 350px;
    }
    .H_Ttitl_Button {
      margin-right: 140px;
      margin-bottom: 20px;
      .H_Button {
        margin-top: 100px;
      }
    }
    .H_Arr {
      display: none;
    }
  }
}
@media only screen and (max-width: 330px) {
  .main-slider {
    .H_image {
      height: 220px;
      max-width: 300px;
    }
    .H_Ttitl_Button {
      margin-right: 90px;
      margin-bottom: 40px;
      .H_Button {
        margin-top: 30px;
      }
    }
  }
}
</style>
