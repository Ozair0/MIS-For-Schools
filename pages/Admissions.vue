<template>
  <div class="Admissions_Main">
    <Page_Info title="Admissions" />
    <AdmissionsBody />
    <AdmissionPageInfo />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import AdmissionsBody from "~/components/AdmissionsComponents/AdmissionsBody";
import AdmissionPageInfo from "~/components/AdmissionsComponents/AdmissionPageInfo";
export default {
  components: { AdmissionPageInfo, AdmissionsBody, Page_Info },
  layout: "public",
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
      this.$store.commit("showFooterImage/showHide", false);
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
