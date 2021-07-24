<template>
  <div
    class="Admission_Card"
    :style="
      `${
        end ? 'flex-direction: row-reverse;justify-content: space-between;' : ''
      }`
    "
  >
    <nuxt-img
      height="220"
      width="377"
      fit="cover"
      format="webp"
      :src="`${image}`"
      :alt="title"
    />

    <div class="Admission_Card_Text">
      <p class="Admission_Card_Title" v-html="title"></p>
      <client-only>
        <p class="Admission_Card_Body" v-html="body"></p>
      </client-only>
    </div>
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
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Admission_Card {
  margin-top: 30px;
  display: flex;
  align-items: center;
  img {
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
    border-radius: 30px;
  }
  .Admission_Card_Text {
    margin-top: 0;
    margin-right: auto;
    margin-left: 20px;
    .Admission_Card_Title {
      font-weight: bold;
      font-size: 25px;
      color: rgba(63, 255, 140, 0.73);
      text-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
        0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
        0px 0px 1px rgba(0, 0, 0, 0.04);
      margin-top: 0;
    }
    .Admission_Card_Body {
      font-weight: bold;
      font-size: 17px;
      color: #787878;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .Admission_Card {
    flex-direction: column !important;
    align-items: center;
    .Admission_Card_Text {
      margin-top: 30px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .Admission_Card {
    img {
      height: 180px;
      width: 337px;
    }
  }
}
@media only screen and (max-width: 400px) {
  .Admission_Card {
    img {
      height: 120px;
      width: 277px;
    }
  }
}
@media only screen and (max-width: 300px) {
  .Admission_Card {
    overflow-x: hidden;
  }
}
</style>
