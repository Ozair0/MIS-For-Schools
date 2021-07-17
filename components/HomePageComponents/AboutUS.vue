<template>
  <div class="About_Us">
    <img src="/Images/Bus.png" class="About_Image" alt="Bus Image" />
    <div class="About_Us_Text">
      <p class="About_Us_Label">About US</p>
      <p class="About_Us_Title">
        Welcome To <span>Kardan</span> International<br />
        School
      </p>
      <p class="About_Us_Body">
        The school brings together international best practices in the education
        sector<br />
        and combines them with local expertise to respond to the growing demand
        for<br />
        quality education in the country. Kardan International School offers<br />
        international curriculum, mixed faculty of teachers, and expert
        school<br />
        management to nurture student growth.
      </p>
      <a href="#" class="About_Us_Read_More">Read More</a>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.About_Us {
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
  display: flex;
  justify-content: space-around;
  img {
    width: 410px;
  }
  .About_Us_Text {
    display: flex;
    flex-direction: column;
    .About_Us_Label {
      padding: 10px 32px;
      background: rgba(63, 255, 140, 0.23);
      border-radius: 38px;
      color: #3fff8c;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      width: max-content;
    }
    .About_Us_Title {
      color: black;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      span {
        color: #663695;
      }
    }
    .About_Us_Body {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #a8a8a8;
    }
    .About_Us_Read_More {
      padding: 12px 38px;
      color: white;
      background: rgba(63, 255, 140, 0.73);
      border-radius: 38px;
      width: max-content;
      filter: drop-shadow(2px 2px 10px rgba(63, 255, 140, 0.73));
    }
  }
}
@media only screen and (max-width: 1024px) {
  .About_Us {
    flex-direction: column-reverse;
    align-items: center;
  }
}
@media only screen and (max-width: 550px) {
  .About_Us {
    margin-left: 10px;
    margin-right: 10px;
    .About_Us_Text {
      margin-bottom: 40px;
    }
    .About_Us_Body {
      text-align: justify;
    }
    img {
      width: 350px;
    }
  }
}
</style>
