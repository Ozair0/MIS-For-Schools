<template>
  <div class="OurTeam_Main">
    <Page_Info title="Our Team" />
    <OurTeamBody />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import OurTeamBody from "~/components/OurTeamComponents/OurTeamBody";
export default {
  components: { OurTeamBody, Page_Info },
  layout: "public",
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("showFooterImage/showHide", false);
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
