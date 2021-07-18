<template>
  <div class="Cafeteria_Main">
    <p class="Cafeteria_Text">
      Kardan International School offers a world class cafeteria facility to our
      students. The school cafeteria is an important venue that shapes student
      experience.<br />
      The KIS cafeteria is designed to promote students’ physical health, social
      interactions, and mealtime skills. We place a high priority on school food
      policy as<br />
      we recognize the value of proper daily nutrients for all students. The KIS
      cafeteria is outfitted with customized seating arrangements for students,
      specialized<br />
      kitchen area for our chef and other personnel. Food is served by our chef
      through supervised buffet service. KIS implements supervised lunch periods
      that<br />
      foster the development of specific skills, such as how to engage in
      meaningful conversations, demonstrate appropriate mealtime manners, intake
      the<br />
      necessary nutrient, and returning plates and culinary.<br />
    </p>
    <div class="Cafeteria_Food_Menus">
      <img src="/Food_Menu1.png" alt="Food Menu 1" />
      <img src="/Food_Menu2.png" alt="Food Menu 2" />
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Cafeteria_Main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  .Cafeteria_Text {
    font-weight: bold;
    font-size: 16px;
    text-align: justify;

    color: #404040;
  }
  .Cafeteria_Food_Menus {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    img {
      margin-top: 30px;
      max-width: 100%;
    }
  }
}
</style>
