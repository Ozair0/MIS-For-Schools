<template>
  <div class="Principal_Message_Main">
    <Page_Info title="Principal's Message" />
    <PrincipalPageBody />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import PrincipalPageBody from "~/components/PrincipalMessageComponents/PrincipalPageBody";
export default {
  components: { Page_Info, PrincipalPageBody },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("showFooterImage/showHide", false);
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  layout: "public",
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
