<template>
  <div class="Admissions_Body_Main">
    <div class="Admissions_Cards">
      <AdmissionsCard
        title="Join Us"
        body="
With a focus on innovation and renewal, Kardan has been at the forefront of a
vigorous drive to enhance the quality of education offered to our students. Kardan
International School builds on a decade of experience and continuing excellence
through the infusion of international best practices to offer unmatched student
experience.
<br><br>
Please schedule a campus tour and learn how your child can flourish with us.
"
        image="Admission1.jpg"
      />
      <AdmissionsCard
        title="Entry Requirements"
        body="
At Kardan International School we welcome all students. Required documents for
applying to Kardan International School are as follows:
<br>
<ul>
<li>A completed admission form.</li>
<li>A copy of your child’s birth certificate or passport as proof of age.</li>
<li>The most recent completed immunization record.</li>
<li>School transfer records if applicable.</li>
</ul>
"
        image="Admission2.jpg"
        end
      />
    </div>
    <AdmissionsTables />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import AdmissionsCard from "~/components/AdmissionsComponents/AdmissionsCard";
import AdmissionsTables from "~/components/AdmissionsComponents/AdmissionsTables";

export default {
  components: { AdmissionsTables, AdmissionsCard }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Admissions_Body_Main {
  .Admissions_Cards {
    display: flex;
    flex-direction: column;
    margin: 20px 30px 30px;
  }
}
</style>
