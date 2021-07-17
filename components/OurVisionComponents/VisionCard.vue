<template>
  <div
    class="Vis_Card"
    :style="
      `${
        end ? 'flex-direction: row-reverse;justify-content: space-between;' : ''
      }`
    "
  >
    <img :src="`${image}`" :alt="title" />
    <div class="Vis_Card_Text">
      <p class="Vis_Card_Title" v-html="title"></p>
      <p class="Vis_Card_Body" v-html="body"></p>
    </div>
    <div
      class="Vis_Card_Line"
      :style="`${end ? '' : 'float:right;margin-left:auto'}`"
    ></div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    title: String,
    body: String,
    image: String,
    end: Boolean
  },
  mounted() {
    console.log(this.end);
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Vis_Card {
  margin-top: 30px;
  display: flex;
  img {
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
    border-radius: 30px;
    height: 220px;
    width: 377px;
    object-fit: cover;
  }
  .Vis_Card_Text {
    margin-top: 30px;
    margin-right: auto;
    margin-left: 20px;
    .Vis_Card_Title {
      font-weight: bold;
      font-size: 25px;
      color: #663695;
    }
    .Vis_Card_Body {
      font-weight: bold;
      font-size: 17px;
      color: #787878;
    }
  }
  .Vis_Card_Line {
    border: 3px solid #000000;
    background: black;
    border-radius: 50px;
  }
}

@media only screen and (max-width: 1024px) {
  .Vis_Card {
    flex-direction: column !important;
    align-items: center;
    .Vis_Card_Line {
      margin-left: 0 !important;
      width: 100%;
    }
  }
}
@media only screen and (max-width: 768px) {
  .Vis_Card {
    img {
      height: 180px;
      width: 337px;
    }
  }
}
@media only screen and (max-width: 400px) {
  .Vis_Card {
    img {
      height: 120px;
      width: 277px;
    }
  }
}
@media only screen and (max-width: 300px) {
  .Vis_Card {
    overflow-x: hidden;
  }
}
</style>
