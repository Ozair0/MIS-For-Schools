<template>
  <div class="W_KIS_Of">
    <p class="W_Text">What KIS Offer</p>
    <div class="W_List">
      <div class="W_Item W_Item_1"></div>
      <div class="W_Item W_Item_2"></div>
      <div class="W_Item W_Item_3"></div>
      <div class="W_Item W_Item_4"></div>
      <div class="W_Item W_Item_5"></div>
      <div class="W_Item W_Item_6"></div>
      <div class="W_Item W_Item_7"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      /*
      * background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      * */
      document.querySelector(".W_Item_1").style.background = `url("${this.$img(
        "/Images/6.png",
        {
          format: "webp"
        }
      )}"),rgba(63, 255, 140, 0.73)`;
      document.querySelector(".W_Item_2").style.background = `url("${this.$img(
        "/Images/7.png",
        {
          format: "webp",
          height: 42,
          width: 42
        }
      )}"),#9c42f3`;
      document.querySelector(".W_Item_3").style.background = `url("${this.$img(
        "/Images/2.png",
        {
          format: "webp"
        }
      )}"),#66cc00`;
      document.querySelector(".W_Item_4").style.background = `url("${this.$img(
        "/Images/4.png",
        {
          format: "webp"
        }
      )}"),rgba(255, 0, 0, 0.73)`;
      document.querySelector(".W_Item_5").style.background = `url("${this.$img(
        "/Images/3.png",
        {
          format: "webp"
        }
      )}"),rgba(242, 255, 89, 0.73)`;
      document.querySelector(".W_Item_6").style.background = `url("${this.$img(
        "/Images/5.png",
        {
          format: "webp"
        }
      )}"),#ff6b00`;
      document.querySelector(".W_Item_7").style.background = `url("${this.$img(
        "/Images/1.png",
        {
          format: "webp"
        }
      )}"),#0038ff`;

      //console.log(document.querySelector(".W_Item_1").style.background);
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.W_KIS_Of {
  overflow-x: hidden;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 41px;
  width: 75vw;
  margin-left: auto;
  margin-right: auto;
  height: 200px;
  position: absolute;
  margin-top: 500px;
  .W_Text {
    margin-top: 10px;
    margin-left: 25px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 47px;

    color: #663695;
  }
  .W_List {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    .W_Item {
      padding: 30px;
      border-radius: 100%;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
      background-size: 100% !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }
    .W_Item_2 {
      background-size: auto !important;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .W_KIS_Of {
    margin-top: 440px;
    height: 150px;
    .W_Text {
      font-size: 23px;
    }
    .W_List {
      margin-top: 15px;
      .W_Item {
        padding: 25px;
        margin-left: 6px;
        margin-right: 6px;
        margin-top: 8px;
      }
      .W_Item_2 {
        background-size: 42px 42px;
      }
    }
  }
}
@media only screen and (max-width: 550px) {
  .W_KIS_Of {
    height: 200px;
    .W_List {
      flex-wrap: wrap;
    }
  }
}
@media only screen and (max-width: 330px) {
  .W_KIS_Of {
    height: auto;
    max-height: 600px;
  }
}
</style>
