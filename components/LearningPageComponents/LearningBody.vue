<template>
  <div class="L_Body_Main">
    <div class="L_Text">
      <p class="L_Title">{{ title }}</p>
      <div class="L_Line_Sub">
        <div class="L_Line"></div>
      </div>
      <p class="L_Body_Text" v-html="body"></p>
    </div>
    <nuxt-img
      v-if="img"
      width="450"
      heigh="400"
      format="webp"
      class="L_Image"
      :src="img"
      :alt="img"
    />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    title: String,
    body: String,
    img: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.L_Body_Main {
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-left: 120px;
  margin-top: 40px;
  overflow-x: hidden;
  align-items: center;
  p {
    margin: 0;
  }
  .L_Text {
    .L_Title {
      font-weight: bold;
      font-size: 30px;
      color: rgba(63, 255, 140, 0.73);
      text-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
        0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
        0 0 1px rgba(0, 0, 0, 0.04);
    }
    .L_Line_Sub {
      margin-top: 10px;
      margin-bottom: 20px;
      .L_Line {
        margin-top: 5px;
        border: 2px solid #9c42f3;
        background: #9c42f3;
        border-radius: 30px;
        width: 80px;
      }
    }
    .L_Body_Text {
      color: #757474;
      text-align: start;
    }
  }
  .L_Image {
    margin-top: auto;
    margin-bottom: auto;
  }
}
@media only screen and (max-width: 1024px) {
  .L_Body_Main {
    flex-direction: column;
    margin-right: 100px;
    margin-left: 100px;
    .L_Image {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
@media only screen and (max-width: 768px) {
  .L_Body_Main {
    flex-direction: column;
    margin-right: 50px;
    margin-left: 50px;
  }
}
@media only screen and (max-width: 540px) {
  .L_Body_Main {
    flex-direction: column;
    margin-right: 20px;
    margin-left: 20px;
    .L_Image {
      width: 370px;
      height: 320px;
    }
  }
}
@media only screen and (max-width: 400px) {
  .L_Body_Main {
    .L_Image {
      width: 340px;
      height: 280px;
    }
  }
}
@media only screen and (max-width: 360px) {
  .L_Body_Main {
    .L_Image {
      width: 290px;
      height: 230px;
      overflow-x: hidden;
    }
  }
}
@media only screen and (max-width: 300px) {
  .L_Body_Main {
    .L_Image {
      width: 250px;
      height: 190px;
    }
  }
}
</style>
