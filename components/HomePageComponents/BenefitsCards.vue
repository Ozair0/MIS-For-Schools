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
    </div>
    <div class="B_Cards">
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
<script></script>
<style lang="scss">
.B_Cards_Column {
  display: flex;
  flex-direction: column;
  .B_Cards {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
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
          padding: 5px 45px;
          border-radius: 100%;
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
        }
        .B_Card_Image1 {
          background: #9c42f3 url("/Images/7.png") no-repeat center;
          background-size: 78px 78px;
        }
        .B_Card_Image2 {
          background: rgba(63, 255, 140, 0.73) url("/Images/6.png") no-repeat
            center;
          background-size: 100%;
        }
        .B_Card_Image3 {
          background: #66cc00 url("/Images/5.png") no-repeat center;
          background-size: 100%;
        }
        .B_Card_Image4 {
          background: #ff6b00 url("/Images/2.png") no-repeat center;
          background-size: 100%;
        }
        .B_Card_Image5 {
          background: #f2ff59 url("/Images/3.png") no-repeat center;
          background-size: 100%;
        }
        .B_Card_Image6 {
          background: #ff0000 url("/Images/4.png") no-repeat center;
          background-size: 100%;
        }
        .B_Card_Text {
          .B_Card_Title {
            font-family: Roboto;
            font-style: normal;
            font-weight: bold;
          }
          .B_Card_Body {
            font-family: Roboto;
            font-style: normal;
            color: #a8a8a8;
          }
        }
      }
    }
  }
}
</style>
