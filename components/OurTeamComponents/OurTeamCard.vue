<template>
  <div class="OurTeam_Card_Main">
    <div class="OurTeam_Img_BG">
      <nuxt-img
        width="400"
        format="webp"
        :src="`/OurTeam/${image}`"
        :alt="image"
      />
    </div>
    <div class="OurTeam_Card_Text">
      <p class="OurTeam_Card_Title">{{ title }}</p>
      <div class="OurTeam_Card_Body">
        <p>{{ position }}</p>
        <p v-if="email && phone">
          <fa :icon="faEnvelope" color="black" style="margin-right: 5px" />
          {{ email }}
        </p>
        <p v-if="email && phone">
          <fa :icon="faMobileAlt" color="black" style="margin-right: 5px" />
          {{ phone }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';
import { faEnvelope, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
    faMobileAlt() {
      return faMobileAlt;
    },
    faEnvelope() {
      return faEnvelope;
    }
  },
  props: {
    image: String,
    title: String,
    position: String,
    email: String,
    phone: String
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.OurTeam_Card_Main {
  margin-top: 40px;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(63, 255, 140, 0.23),
    0px 16px 24px rgba(63, 255, 140, 0.23), 0px 4px 8px rgba(63, 255, 140, 0.23),
    0px 0px 1px rgba(63, 255, 140, 0.23);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-left: 5px;
  .OurTeam_Img_BG {
    background: #a8a8a8;
    border-radius: 15px;
    width: 400px;
    display: flex;
    justify-content: center;
    img {
      width: 300px;
      height: 440px;
    }
  }

  .OurTeam_Card_Text {
    margin: 0 0 20px 0;
    width: 100%;
    .OurTeam_Card_Title {
      font-weight: bold;
      font-size: 20px;
      color: #000000;
      text-align: center;
    }
    .OurTeam_Card_Body {
      text-align: center;
      p {
        font-weight: bold;
        font-size: 14px;
        color: #595959;
      }
    }
  }
}
@media only screen and (max-width: 540px) {
  .OurTeam_Card_Main {
    .OurTeam_Img_BG {
      width: 350px;
      img {
        border-radius: 15px;
      }
    }
    .OurTeam_Card_Text {
      .OurTeam_Card_Title {
        font-size: 18px;
      }
      .OurTeam_Card_Body {
        p {
          font-size: 13px;
        }
      }
    }
  }
}
@media only screen and (max-width: 430px) {
  .OurTeam_Card_Main {
    width: 250px;
    .OurTeam_Img_BG {
      width: 250px;
      img {
        border-radius: 15px;
        width: 250px;
        height: 350px;
      }
    }

    .OurTeam_Card_Text {
      .OurTeam_Card_Title {
        font-size: 16px;
      }
      .OurTeam_Card_Body {
        p {
          font-size: 11px;
        }
      }
    }
  }
}
</style>
