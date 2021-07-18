<template>
  <div class="Campus_Card_Main">
    <img :src="`/Campus/${image}`" :alt="image" />
    <div class="Campus_Card_Text">
      <p class="Campus_Card_Title">{{ title }}</p>
      <p class="Campus_Card_Body" v-html="body"></p>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    image: String,
    title: String,
    body: String
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Campus_Card_Main {
  //flex: 0 0 360px;
  margin-top: 40px;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 15px;
    width: 360px;
  }
  .Campus_Card_Text {
    width: max-content;
    margin: 0 0 20px 40px;

    .Campus_Card_Title {
      font-weight: bold;
      font-size: 20px;
      color: #000000;
    }
    .Campus_Card_Body {
      font-weight: bold;
      font-size: 14px;
      color: #595959;
    }
  }
}
@media only screen and (max-width: 540px) {
  .Campus_Card_Main {
    img {
      border-radius: 15px;
      width: 300px;
    }
    .Campus_Card_Text {
      .Campus_Card_Title {
        font-size: 18px;
      }
      .Campus_Card_Body {
        font-size: 13px;
      }
    }
  }
}
@media only screen and (max-width: 430px) {
  .Campus_Card_Main {
    width: 240px;
    img {
      border-radius: 15px;
      width: 240px;
    }
    .Campus_Card_Text {
      margin-left: 20px;
      .Campus_Card_Title {
        font-size: 16px;
      }
      .Campus_Card_Body {
        font-size: 11px;
      }
    }
  }
}
</style>
