<template>
  <div class="Campus_Main">
    <Page_Info title="Campus and Facilities" />
    <CampusBody />
    <CampusCards />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import CampusBody from "~/components/CampusFacilitiesComponents/CampusBody";
import CampusCards from "~/components/CampusFacilitiesComponents/CampusCards";
export default {
  components: { CampusCards, CampusBody, Page_Info },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("showFooterImage/showHide", true);
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  layout: "public"
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
.Campus_Main {
  margin-bottom: 40px;
}
</style>
