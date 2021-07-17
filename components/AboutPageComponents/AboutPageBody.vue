<template>
  <div class="About_Body">
    <div class="About_Text">
      <p class="About_Title">Welcome To Kardan International School</p>
      <div class="About_Line_Sub">
        <p class="About_Sub_Title">
          Afghanistan’s first and only digital school
        </p>
        <div class="About_Line"></div>
      </div>
      <p class="About_Body_Text">
        Kardan International School is Afghanistan’s first and only digital
        school. The school brings together<br />international best practices in
        the education sector and combines them with local expertise to respond
        to<br />
        the growing demand for quality education in the country. Kardan
        International School offers international<br />curriculum, mixed faculty
        of teachers, and expert school management to nurture student growth.<br />
        Through the Kardan International School, we are redefining primary and
        secondary education<br />in Afghanistan. Kardan represents the most
        recognizable brand in the education sector in Afghanistan with over<br />a
        decade of experience in providing primary, secondary, and post-secondary
        education services.<br />With a focus on innovation and renewal, Kardan
        has been at the forefront of a vigorous drive to enhance the<br />quality
        of education offered in the country.<br />At Kardan International
        School, our approach to education relies on strategic investments to
        exponentially<br />
        enhance the quality of services offered to our students. These strategic
        investments at Kardan<br />International School focuses on:
      </p>
    </div>
    <img class="About_Image" src="/campus.jpg" alt="KIS_Campus" />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  mounted() {},

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.About_Body {
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-left: 120px;
  margin-top: 40px;
  overflow-x: hidden;
  p {
    margin: 0;
  }
  .About_Text {
    .About_Title {
      font-weight: bold;
      font-size: 30px;
      color: rgba(63, 255, 140, 0.73);
      text-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
        0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
        0 0 1px rgba(0, 0, 0, 0.04);
    }
    .About_Line_Sub {
      margin-top: 10px;
      margin-bottom: 20px;
      .About_Sub_Title {
        font-weight: bold;
        font-size: 20px;
        color: #663695;
      }
      .About_Line {
        margin-top: 5px;
        border: 2px solid #9c42f3;
        background: #9c42f3;
        border-radius: 30px;
        width: 80px;
      }
    }
    .About_Body_Text {
      color: #757474;
      text-align: start;
    }
  }
  .About_Image {
    margin-top: auto;
    margin-bottom: auto;
  }
}
@media only screen and (max-width: 1024px) {
  .About_Body {
    flex-direction: column;
    margin-right: 100px;
    margin-left: 100px;
    .About_Image {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
@media only screen and (max-width: 768px) {
  .About_Body {
    flex-direction: column;
    margin-right: 50px;
    margin-left: 50px;
  }
}
@media only screen and (max-width: 540px) {
  .About_Body {
    flex-direction: column;
    margin-right: 20px;
    margin-left: 20px;
    .About_Image {
      width: 300px;
      height: 250px;
    }
  }
}
</style>
