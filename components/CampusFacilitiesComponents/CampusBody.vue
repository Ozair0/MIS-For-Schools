<template>
  <div class="Campus_Body">
    <div class="Campus_Text">
      <p class="Campus_Title">Facilities at Kardan International School</p>
      <div class="Campus_Line_Sub">
        <div class="Campus_Line"></div>
      </div>

      <p class="Campus_Body_Text">
        Kardan International School campus offers special facilities to allow
        your child to pursue their passions.<br />
        Kardan International School campus is located in the heart of Kabul
        city. Our school building is custom<br />
        built for school use, our classroom sizes conform to international
        standards. The school offers excellent<br />
        facilities including indoor and outdoor playgrounds, facilities for
        organized sports, cafeteria, and a number<br />
        of specialized enrichment classrooms for arts, music, drama, and
        STEM.<br />
        <br />
        The school facilities are supported by the application of latest
        technologies to deliver modern learning<br />
        inside classroom as well as outside. The school offers specialized
        facilities for our pre-school students,<br />
        while primary school students avail designated facilities for their age
        group. Food is served by the school in<br />
        accordance with the school menu. All food served in the school premises
        is prepared by the school kitchen<br />
        staff ensuring the highest standards of safety and nutrition.<br />
      </p>
    </div>
    <img class="facility_Image" src="/facility.jpg" alt="facility Image" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Campus_Body {
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-left: 120px;
  margin-top: 40px;
  overflow-x: hidden;
  p {
    margin: 0;
  }
  .Campus_Text {
    .Campus_Title {
      font-weight: bold;
      font-size: 30px;
      color: rgba(63, 255, 140, 0.73);
      text-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
        0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
        0 0 1px rgba(0, 0, 0, 0.04);
    }
    .Campus_Line_Sub {
      margin-top: 10px;
      margin-bottom: 20px;
      .Campus_Line {
        margin-top: 5px;
        border: 2px solid #9c42f3;
        background: #9c42f3;
        border-radius: 30px;
        width: 80px;
      }
    }
    .Campus_Body_Text {
      color: #757474;
      text-align: start;
    }
  }
  .facility_Image {
    margin-top: auto;
    margin-bottom: auto;
  }
}
@media only screen and (max-width: 1024px) {
  .Campus_Body {
    flex-direction: column;
    margin-right: 100px;
    margin-left: 100px;
    .facility_Image {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
@media only screen and (max-width: 768px) {
  .Campus_Body {
    flex-direction: column;
    margin-right: 50px;
    margin-left: 50px;
  }
}
@media only screen and (max-width: 540px) {
  .Campus_Body {
    flex-direction: column;
    margin-right: 20px;
    margin-left: 20px;
    .facility_Image {
      width: 300px;
      height: 450px;
    }
  }
}
</style>
