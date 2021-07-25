<template>
  <div class="OurTeam_Title_Cards">
    <p class="OurTeam_Title_1">School Administration</p>
    <div class="OurTeam_Line_Sub">
      <div class="OurTeam_Line"></div>
    </div>
    <div class="OurTeam_Administration">
      <OurTeamCard
        title="Naseerullah"
        image="Naseerullah.png"
        position="Managing Director"
        phone="078 582 8284"
        email="naseerullah@kardan.edu.af"
      />
      <OurTeamCard
        title="Maryam Saadat"
        image="Maryam Saadat.png"
        position="Principal"
        phone="073 028 4444"
        email="m.sadat@kis.edu.af"
      />
      <OurTeamCard
        title="Humaira Sadozai"
        image="Homaira Sadozai.png"
        position="Enrollment Officer"
        phone="078 677 8197"
        email="h.sadozai@kis.edu.af"
      />
      <OurTeamCard
        title="Tasal Ahmad"
        image="Tasal Ahmad.png"
        position="Facilities Manager"
        phone="078 156 5419"
        email="t.ahmad@kis.edu.af"
      />
      <OurTeamCard
        title="Shamsulhaq Qaderi"
        image="Shams.png"
        position="Security & Transport Manager"
        phone="078 582 8284"
        email="S.qadiry@kis.edu.af"
      />
      <OurTeamCard
        title="Rokhan Salik"
        image="Rokhan.png"
        position="Graphic Designer"
      />
    </div>
    <p class="OurTeam_Title_1">School Teachers</p>
    <div class="OurTeam_Line_Sub">
      <div class="OurTeam_Line"></div>
    </div>
    <p class="OurTeam_Sub_Title">
      Our team of teacher represent the best and the brightest in their fields.
      Kardan International School has a mixed faculty of Afghan and
      International teachers.<br />
      Some of our teachers are profiled here:
    </p>
    <div class="OurTeam_Teachers">
      <OurTeamCard
        title="Najiba Langari"
        image="Najiba Langri.png"
        position="Teacher - Dari Literacy"
      />
      <OurTeamCard
        title="Sabagul Rehmat"
        image="Sabagul Rehmat.png"
        position="Teacher - Science"
      />
      <OurTeamCard
        title="Shukria Saadat Hashimi"
        image="Shukria Saadat Hashimi.png"
        position="Graphic Designer"
      />
      <OurTeamCard
        title="Juweria"
        image="Juweria.png"
        position="Teacher - Islamic Studies"
      />
      <OurTeamCard
        title="Abdul Mutalib Walizada"
        image="Abdul Mutalib Walizada.png"
        position="Teacher - English"
      />
      <OurTeamCard
        title="Masood Ziyaee"
        image="Masoud Ziayee.png"
        position="Teacher - Robotics and AI"
      />
      <OurTeamCard
        title="Mustafa Ahmad"
        image="Mustafa Ahmad.png"
        position="Teacher - Digital Technology"
      />
      <OurTeamCard
        title="Noora Rahman"
        image="Noora Rahman.png"
        position="Teacher - English"
      />
      <OurTeamCard
        title="Faryal Nasimi"
        image="Faryal Nasimi.png"
        position="Teacher - Pre-School"
      />
      <OurTeamCard
        title="Lima Khilwati"
        image="Lima Khilwati.png"
        position="Teacher - Pre-School"
      />
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import OurTeamCard from "~/components/OurTeamComponents/OurTeamCard";
export default {
  components: { OurTeamCard }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.OurTeam_Title_Cards {
  margin-left: 40px;
  margin-right: 40px;
  .OurTeam_Title_1 {
    font-weight: bold;
    font-size: 30px;
    color: rgba(63, 255, 140, 0.73);
    text-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
      0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
      0 0 1px rgba(0, 0, 0, 0.04);
    margin-bottom: 0;
  }
  .OurTeam_Line_Sub {
    margin-bottom: 20px;
    .OurTeam_Line {
      margin-top: 5px;
      border: 2px solid #66cc00;
      background: #66cc00;
      border-radius: 30px;
      width: 80px;
    }
  }
  .OurTeam_Sub_Title {
    font-weight: bold;
    font-size: 17px;
    color: #787878;
  }
  .OurTeam_Administration {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 60px;
  }
  .OurTeam_Teachers {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 60px;
  }
}
</style>
