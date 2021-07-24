<template>
  <div class="A_Page_Info">
    <p class="A_Page_Info_Title">How to Apply</p>
    <p class="A_Page_Info_Title">
      You can apply using our online form or schedule a campus tour by
      contacting us.
    </p>
    <div class="A_Page_Info_Links">
      <a href="#" class="A_BTN_P">Application Form</a>
      <a href="#" class="A_BTN_S">KIS Brochure</a>
      <a href="#" class="A_BTN_P">Course Catalogue</a>
      <a href="#" class="A_BTN_S">Tuition Fee Guide</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector(
        ".A_Page_Info"
      ).style.background = `linear-gradient(0deg,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url('${this.$img(
        "/14.jpg",
        { format: "webp" }
      )}')`;
    });
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.A_Page_Info {
  height: 525px;
  background-position-y: -60px;
  display: flex;
  flex-direction: column;

  .A_Page_Info_Title {
    margin-left: 90px;
    &:first-child {
      margin-top: 100px;
    }

    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    color: white;
  }
  .A_Page_Info_Links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 90px;
    a {
      text-decoration: none;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: white;
      padding: 7px 20px;
      &:not(:first-child) {
        margin-left: 25px;
      }
    }
    .A_BTN_P {
      background: #9c42f3;
      box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
        0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
        0px 0px 1px rgba(0, 0, 0, 0.04);
      border-radius: 38px;
    }
    .A_BTN_S {
      background: #a8a8a8;
      box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
        0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
        0px 0px 1px rgba(0, 0, 0, 0.04);
      border-radius: 38px;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .A_Page_Info {
    background-position-x: -150px;
    .A_Page_Info_Links {
      margin: 0;
      justify-content: space-around;
      a {
        margin-bottom: 10px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .A_Page_Info {
    background-position-x: -300px;
    .A_Page_Info_Title {
      margin-left: auto;
      margin-right: auto;
    }
    .A_Page_Info_Links {
      margin-top: 20px;
      a {
        flex: 0 0 auto;
        &:not(:first-child) {
          margin-left: 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 450px) {
  .A_Page_Info {
    height: 625px;
  }
}
</style>
