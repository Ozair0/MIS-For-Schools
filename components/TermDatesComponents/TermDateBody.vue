<template>
  <div class="Term_Main">
    <nuxt-img
      height="220"
      width="377"
      fit="cover"
      format="webp"
      src="Term.jpg"
      alt="Child Image"
    />
    <div class="Term_Main_Text_Table">
      <div class="Term_Main_Text">
        <p class="Term_Main_Title">Term Dates</p>
        <p class="Term_Main_Body">
          Kardan International School academic year conforms with Afghanistan
          Ministry of Education<br />guidelines.
        </p>
      </div>
      <table class="Term_Main_Table">
        <thead>
          <tr>
            <th>School Start Date</th>
            <th>School End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>March 23</td>
            <td>December 21</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Term_Main {
  display: flex;
  margin-top: 90px;
  margin-left: auto;
  margin-right: auto;
  max-width: max-content;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  img {
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
    border-radius: 30px;
  }
  .Term_Main_Text_Table {
    display: flex;
    flex-direction: column;
    .Term_Main_Text {
      margin-top: 0;
      margin-left: 20px;

      .Term_Main_Title {
        font-weight: bold;
        font-size: 25px;
        color: #663695;
        margin: 0;
      }

      .Term_Main_Body {
        font-weight: bold;
        font-size: 17px;
        color: #787878;
      }
    }

    .Term_Main_Table {
      margin-left: 20px;
      border-collapse: collapse;
      &,
      th,
      td {
        border: 1px solid black;
      }
      th,
      td {
        padding: 10px;
        text-align: left;
      }
      td {
        font-weight: bold;
        color: #787878;
      }
      th {
        font-weight: bold;
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  .Term_Main {
    .Term_Main_Text_Table {
      margin-right: 20px;
      margin-left: 20px;
      .Term_Main_Text {
        margin: 20px 0 0;
      }
      .Term_Main_Table {
        margin: 0;
      }
    }
  }
}
@media only screen and (max-width: 400px) {
  .Term_Main {
    img {
      height: 170px !important;
      width: 327px !important;
    }
  }
}
@media only screen and (max-width: 350px) {
  .Term_Main {
    img {
      height: 130px !important;
      width: 277px !important;
    }
  }
}
</style>
