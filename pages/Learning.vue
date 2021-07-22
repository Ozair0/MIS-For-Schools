<template>
  <div class="Learning_Main">
    <Page_Info title="Learning" />
    <LearningBody
      title="Student Success"
      body="
  At Kardan International School, we ensure that your child receives the best education in a comfortable and
progressive environment. We make it our business to ensure that every child at the school is provided with
the education required to assure their success. To ensure student success, Kardan International School
offers a unique mix of curriculum application with expert pedagogical mannerism, coupled with excellent
amenities.
<br><br>
To support student success, we recognize that every child is unique and therefore definition of success
needs to be mediated to allow all students to succeed. Kardan International School supports its students to
not only excel academically but also grow in character as individuals. In this way, we engage every student
individually through personalized learning paths. Our curriculum application supports individual student
learning plans ensuring that all students learn regardless of their learning pace.
"
      img="/Student_Success.png"
    />
    <LearningBody
      title="Curriculum Composition"
      body="
At Kardan International School our focus on academic excellence has enabled us to integrate McGraw Hill content in Sciences, Mathematics, Technology, and English
with core national Afghan content in Islamic Studies and local languages. We offer our students the ability to choose what they learn. Kardan International School offers
a suite of courses that allows our students to pursue their desired learning path through a selection of core and enrichment courses.
For more details please download our course <a href='#'>catalogue</a>.
"
    />
    <div class="Learning_Cards">
      <LearningCard
        image="9.jpg"
        title="International Core Subjects"
        body="
At Kardan International School core subjects<br>
consist of Sciences, Mathematics, English, and<br>
Technology. Enrollment in these subjects is<br>
mandatory for all KIS students. International<br>
core subjects are offered through our enduring<br>
partnership with McGraw Hill for the provision<br>
of digital content with an emphasis on building<br>
core competencies in STEM among KIS<br>
students.<br>
"
      />
      <LearningCard
        image="7.jpg"
        title="National Core Subjects"
        body="
Core subjects at Kardan International School<br>
consist of Dari, Pashto, and Islamic Education<br>
mandated by the Ministry of Education.<br>
Enrollment in these subjects is mandatory for<br>
all KIS students. We have placed the Ministry<br>
of Education content as the foundation of<br>
these course and have innovated to ensure<br>
conformity to international standards. National<br>
subject content is digitized and by utilizing<br>
curriculum experts we have engaged in<br>
uplifting the quality of core content for KIS<br>
students.<br>
"
      />
      <LearningCard
        image="8.jpg"
        title="Enrichment Subjects"
        body="
At Kardan International School we exercise our<br>
advantage over the rest of the schools with the<br>
integration of international best practices<br>
through our enrichment courses. Enrichment<br>
courses are offered as individualized offerings<br>
to students and parents to allow each of our<br>
student to pursue their unique learning path.<br>
These courses augment our core subjects and<br>
allow our students to build unique skills and<br>
pursue their passions. KIS enrichment courses<br>
are customized learning packages that<br>
integrates content from different disciplines to<br>
allow our students to discover and grow.<br>
"
      />
    </div>
    <LearningBody
      title="Digital Learning"
      body="
  Kardan International School offers digital classrooms. Our classrooms are
outfitted with the latest education technology tools including digital boards,
networked and wireless internet access, digital content, student tablets,
teacher technology corner.
<br><br>
Kardan International School offers our core curriculum and content in digital
platforms. Since, Math, English, Quran, IT, Robotics, and Music are offered
digitally to students. Our technology orientation and digital delivery of core
content will enable our students to thrive in the future economy.
<br><br>
This means that the school does not offer conventional text books to students.
We believe that technological integration in education has further expanded
the horizons of learning and has redefined expectations especially among
younger age groups. Students are provided with tablets that contains all
learning material.<br>
"
      img="/Digital_Learning.jpg"
    />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import LearningBody from "~/components/LearningPageComponents/LearningBody";
import LearningCard from "~/components/LearningPageComponents/LearningCard";
export default {
  components: { LearningCard, LearningBody, Page_Info },
  layout: "public",
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Learning_Main {
  .Learning_Cards {
    border-radius: 20px;
    margin: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px 40px;
    justify-content: space-around;
    align-content: center;
  }
}
</style>
