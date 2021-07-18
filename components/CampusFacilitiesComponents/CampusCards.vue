<template>
  <div class="Campus_Cards_Main">
    <CampusCard
      image="1.jpg"
      title="Playground"
      body="
  Play is an important part of children’s<br>
growth. We offer specialized play areas for<br>
our pre-school and primary school<br>
students. Kardan International School has<br>
a custom designed and built indoor<br>
playground that offers world class<br>
development and entertainment value to<br>
students. Our outdoor playground offers<br>
excellent facilities for breaktime fun for<br>
students.
"
    />
    <CampusCard
      image="2.jpg"
      title="Athletics"
      body="
    Athletics is an important part of a<br>
student’s development. Kardan<br>
International School offers a range of<br>
sport amenities to our students. We offer<br>
a miniature soccer field, as well as<br>
facilities for volleyball, badminton, Tennis,<br>
Basketball. Students avail these services in<br>
the form of structured and organized<br>
sports competitions and intramural<br>
leagues throughout the school year.
"
    />
    <CampusCard
      image="3.jpg"
      title="Enrichment Classrooms"
      body="
  Our core academic content is<br>
supplemented by enrichment classes such<br>
Arts, Robotics, Drama, Music, Theatre and<br>
other classes outlined in our academic<br>
calendar. These classes are offered in our<br>
specialized enrichment rooms that offer<br>
world class learning and development<br>
tools for our teachers and students.
"
    />
    <CampusCard
      image="4.jpg"
      title="Security"
      body="
  Security of our students and staff is at the<br>
heart of our daily grind. We have taken<br>
special measures to ensure school<br>
security. Access to school grounds is<br>
limited to our students and staff. Student<br>
pick up and Drop off is managed by our<br>
security team in a special demarcated<br>
facility inside our campus.
"
    />
    <CampusCard
      image="5.jpg"
      title="Transportation"
      body="
  Parents and students are able to arrange<br>
for their transport with the school<br>
security team. The security team will issue<br>
passes for approved vehicles. Parents who<br>
intend to utilize school transport for their<br>
children need to contact the school<br>
enrollment officer.
"
    />
    <CampusCard
      image="6.jpg"
      title="Cafeteria & Kitchen"
      body="
  Lunches and all food at Kardan<br>
International School is prepared by our<br>
own kitchen staff. School menu is<br>
prepared in accordance with health and<br>
safety standards ensuring proper<br>
nutrition. The school cafeteria is an open<br>
space for all student use, lunch time is<br>
supervised by teachers.
"
    />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import CampusCard from "~/components/CampusFacilitiesComponents/CampusCard";
export default {
  components: { CampusCard }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Campus_Cards_Main {
  background: #f0f0f0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px 40px;
  justify-content: space-around;
  align-content: center;
}
</style>
