<template>
  <div class="Learning_Card_Main">
    <nuxt-img
      width="360"
      height="210"
      format="webp"
      :src="`/Campus/${image}`"
      :alt="image"
    />
    <div class="Learning_Card_Text">
      <p class="Learning_Card_Title">{{ title }}</p>
      <p class="Learning_Card_Body" v-html="body"></p>
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
.Learning_Card_Main {
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
  }
  .Learning_Card_Text {
    width: max-content;
    margin: 0 0 20px 40px;

    .Learning_Card_Title {
      font-weight: bold;
      font-size: 20px;
      color: #000000;
    }
    .Learning_Card_Body {
      font-weight: bold;
      font-size: 14px;
      color: #595959;
    }
  }
}
@media only screen and (max-width: 540px) {
  .Learning_Card_Main {
    img {
      border-radius: 15px;
    }
    .Learning_Card_Text {
      .Learning_Card_Title {
        font-size: 18px;
      }
      .Learning_Card_Body {
        font-size: 13px;
      }
    }
  }
}
@media only screen and (max-width: 430px) {
  .Learning_Card_Main {
    width: 240px;
    img {
      border-radius: 15px;
      width: 240px;
    }
    .Learning_Card_Text {
      margin-left: 20px;
      .Learning_Card_Title {
        font-size: 14px;
      }
      .Learning_Card_Body {
        font-size: 10px;
      }
    }
  }
}
</style>
