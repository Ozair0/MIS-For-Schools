<template>
  <div class="A_Card">
    <div class="A_Image" :style="`background-color: ${color};`">
      <img :src="`/${icon}`" :alt="`${icon}`" />
    </div>
    <div class="A_Text">
      <p class="A_Title">{{ title }}</p>
      <p class="A_Body" v-html="body"></p>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    title: String,
    body: String,
    icon: String,
    color: String
  },
  mounted() {},

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.A_Card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .A_Image {
    padding: 20px;
    border-radius: 100%;
    height: min-content;
    margin-right: 20px;
    img {
      height: min-content;
    }
  }
  .A_Text {
    .A_Title {
      font-size: 18px;
      color: #000000;
      margin-top: 0;
    }
    .A_Body {
      font-size: 18px;
      color: #797979;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .A_Card {
    justify-content: normal;
  }
}
@media only screen and (max-width: 768px) {
  .A_Card {
    flex-direction: column;
    align-items: center;
    .A_Image {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}
</style>
