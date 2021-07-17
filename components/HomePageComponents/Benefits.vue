<template>
  <div class="Benefits">
    <a href="#" class="Ben_BTN">Benefits</a>
    <div class="B_Text">
      <div class="B_Text_Title">
        <p class="B_Text_Title_1">Why choose us</p>
        <p class="B_Text_Title_2">for your happier kids</p>
      </div>
      <div class="B_Text_Body">
        <p>
          Look into the eyes of a young child and see the sparkle and wonder.
          Develop these passions<br />and watch the adult bloom into someone
          special. At Kardan International School, we work<br />every day to
          build the foundations for amazing futures.
        </p>
      </div>
    </div>
    <BenefitsCards />
  </div>
</template>
<script>
import BenefitsCards from "~/components/HomePageComponents/BenefitsCards";
export default {
  components: { BenefitsCards }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Benefits {
  margin-top: 200px;
  width: 75vw;
  margin-left: auto;
  margin-right: auto;
  .Ben_BTN {
    text-decoration: none;
    padding: 10px 28px;
    filter: drop-shadow(2px 2px 10px rgba(63, 255, 140, 0.73));
    background: rgba(63, 255, 140, 0.73);
    border-radius: 38px;
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
  }
  .B_Text {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;
    .B_Text_Title {
      .B_Text_Title_1 {
        font-size: 30px;
        font-style: normal;
        font-weight: bold;
        color: rgba(63, 255, 140, 0.73);
        text-shadow: 2px 2px 10px rgba(63, 255, 140, 0.73);
      }
      .B_Text_Title_2 {
        color: rgba(0, 0, 0, 0.65);
        font-size: 20px;
        font-style: normal;
        font-weight: bold;
      }
    }
    .B_Text_Body {
      color: #787878;
      font-size: 20px;
      font-style: normal;
      font-weight: bold;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .Benefits {
    .B_Text {
      flex-direction: column;
      .B_Text_Body {
        text-align: justify;
      }
    }
  }
}
@media only screen and (max-width: 550px) {
  .Benefits {
    margin-top: 230px;
    width: 100vw;
    .Ben_BTN {
      margin-left: 10px;
    }
    .B_Text {
      margin-left: 15px;
      margin-right: 15px;
      .B_Text_Body {
        font-size: 14px;
      }
    }
  }
}
</style>
