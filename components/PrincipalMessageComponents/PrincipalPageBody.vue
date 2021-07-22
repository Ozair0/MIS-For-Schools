<template>
  <div class="Principal_Body">
    <div class="Principal_Text">
      <p class="Principal_Title">Maryam Saadat</p>
      <div class="Principal_Line_Sub">
        <p class="Principal_Sub_Title">
          Principal
        </p>
        <div class="Principal_Line"></div>
      </div>
      <p class="Principal_Body_Text">
        Welcome to Kardan International School. I take pride in being part of
        this community. All schools are<br />
        special, and every child should cherish their experience in school. At
        Kardan International School, we<br />
        provide a safe learning space to allow our students to grow and learn.
        Our ambition of being the best<br />
        school can be found throughout the school in the genuine pride our
        students and staff take in being part of<br />
        this community.
        <br />
        As the Principal of the school I am thrilled to know all my students,
        and working with their teachers, staff,<br />
        and parents to help them develop the character traits that will let them
        succeed in life. We understand and<br />
        appreciate that every child is unique in their ways and we make it our
        mission to help them flourish in<br />
        character and in their academics.
        <br />
        On a daily basis, I lead a team of professionals to ensure that our
        students excel. Our professional staff<br />
        implement a unique curriculum that is composed of national and
        international content and supplemented<br />
        by enrichment classes such as drama, robotics, art, and athletics. Our
        world class curriculum is<br />
        supplemented by impeccable facilities in the form of digital classrooms,
        specialized enrichment<br />
        classrooms, playground and athletics facilities, and cafeteria.<br />
        <br />
        On behalf of Kardan International School, I thank you for being part of
        our community. I look forward to<br />
        seeing you and welcoming you to our school.
      </p>
    </div>
    <nuxt-img
      format="webp"
      class="Principal_Image"
      src="/Principal.png"
      alt="Principal Image"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Principal_Body {
  display: flex;
  justify-content: space-between;
  margin-right: 120px;
  margin-left: 120px;
  margin-top: 40px;
  overflow-x: hidden;
  p {
    margin: 0;
  }
  .Principal_Text {
    .Principal_Title {
      font-weight: bold;
      font-size: 30px;
      color: rgba(63, 255, 140, 0.73);
      text-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
        0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
        0 0 1px rgba(0, 0, 0, 0.04);
    }
    .Principal_Line_Sub {
      margin-top: 10px;
      margin-bottom: 20px;
      .Principal_Sub_Title {
        font-weight: bold;
        font-size: 20px;
        color: #663695;
      }
      .Principal_Line {
        margin-top: 5px;
        border: 2px solid #9c42f3;
        background: #9c42f3;
        border-radius: 30px;
        width: 80px;
      }
    }
    .Principal_Body_Text {
      color: #757474;
      text-align: start;
    }
  }
  .Principal_Image {
    margin-top: auto;
    margin-bottom: auto;
  }
}
@media only screen and (max-width: 1024px) {
  .Principal_Body {
    flex-direction: column;
    margin-right: 100px;
    margin-left: 100px;
    .Principal_Image {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
@media only screen and (max-width: 768px) {
  .Principal_Body {
    flex-direction: column;
    margin-right: 50px;
    margin-left: 50px;
  }
}
@media only screen and (max-width: 540px) {
  .Principal_Body {
    flex-direction: column;
    margin-right: 20px;
    margin-left: 20px;
    .Principal_Image {
      width: 300px;
      height: 450px;
    }
  }
}
</style>
