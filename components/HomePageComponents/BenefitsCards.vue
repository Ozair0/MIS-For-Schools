<template>
  <div class="B_Cards_Column">
    <div class="B_Cards">
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image1"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image2"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image3"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image4"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image5"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
      <div class="B_Card">
        <div class="B_CardB">
          <div class="B_Card_Image B_Card_Image6"></div>
          <div class="B_Card_Text">
            <p class="B_Card_Title">Education Excellence</p>
            <p class="B_Card_Body">
              Look into the eyes of a young<br />child and see the sparkle
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      document.querySelector(
        ".B_Card_Image1"
      ).style.background = `#9c42f3 url("${this.$img("/Images/7.png", {
        format: "webp",
        width: 78,
        height: 78
      })}") no-repeat center`;
      document.querySelector(
        ".B_Card_Image2"
      ).style.background = `rgba(63, 255, 140, 0.73) url("${this.$img(
        "/Images/6.png",
        {
          format: "webp"
        }
      )}") no-repeat center`;
      document.querySelector(
        ".B_Card_Image3"
      ).style.background = `#66cc00 url("${this.$img("/Images/5.png", {
        format: "webp"
      })}") no-repeat center`;
      document.querySelector(
        ".B_Card_Image4"
      ).style.background = `#ff6b00 url("${this.$img("/Images/2.png", {
        format: "webp"
      })}") no-repeat center`;
      document.querySelector(
        ".B_Card_Image5"
      ).style.background = `#f2ff59 url("${this.$img("/Images/3.png", {
        format: "webp"
      })}") no-repeat center`;
      document.querySelector(
        ".B_Card_Image6"
      ).style.background = `#ff0000 url("${this.$img("/Images/4.png", {
        format: "webp"
      })}") no-repeat center`;
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.B_Cards_Column {
  display: flex;
  flex-direction: column;
  .B_Cards {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    .B_Card {
      padding: 10px;
      &:hover {
        background: #ffffff;
        box-shadow: 6px 11px 28px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
      }
      &:hover > .B_CardB {
        border: 3px dashed #3fff8c;
        box-sizing: border-box;
        border-radius: 20px;
        padding: 12px 17px;
      }

      .B_CardB {
        display: flex;
        padding: 15px 20px;
        .B_Card_Image {
          margin-right: 25px;
          padding: 5px 50px;
          border-radius: 100%;
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
          background-size: 100% !important;
        }
        .B_Card_Image1 {
          background-size: auto !important;
        }

        .B_Card_Text {
          .B_Card_Title {
            font-style: normal;
            font-weight: bold;
          }
          .B_Card_Body {
            font-style: normal;
            color: #a8a8a8;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 392px) {
  .B_Cards_Column {
    .B_Cards {
      .B_Card {
        .B_CardB {
          .B_Card_Image {
            padding: 5px 80px;
          }
        }
      }
    }
  }
}
</style>
