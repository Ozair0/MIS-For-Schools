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
export default {};
</script>
<style lang="scss">
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
    }
    .W_Item_1 {
      background: url("/Images/6.png"), rgba(63, 255, 140, 0.73);
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    .W_Item_2 {
      background: url("/Images/7.png"), #9c42f3;
      background-size: 50px 50px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .W_Item_3 {
      background: url("/Images/2.png"), #66cc00;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .W_Item_4 {
      background: url("/Images/4.png"), rgba(255, 0, 0, 0.73);
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .W_Item_5 {
      background: url("/Images/3.png"), rgba(242, 255, 89, 0.73);
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .W_Item_6 {
      background: url("/Images/5.png"), #ff6b00;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .W_Item_7 {
      background: url("/Images/1.png"), #0038ff;
      background-size: 100%;
      background-repeat: no-repeat;
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
