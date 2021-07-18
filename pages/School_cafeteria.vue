<template>
  <div class="School_Cafeteria_Main">
    <Page_Info title="School Cafeteria & Kitchen" />
    <SchoolCafeteriaBody />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import SchoolCafeteriaBody from "~/components/SchoolCafeteriaComponents/SchoolCafeteriaBody";
export default {
  components: { SchoolCafeteriaBody, Page_Info },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  layout: "public"
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.School_Cafeteria_Main {
  margin-bottom: 40px;
}
</style>
