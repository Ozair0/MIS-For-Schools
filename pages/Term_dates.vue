<template>
  <div class="Term_Dates_Main">
    <Page_Info title="Term Dates" />
    <TermDateBody />
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import TermDateBody from "~/components/TermDatesComponents/TermDateBody";
export default {
  components: { TermDateBody, Page_Info },
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
.Term_Dates_Main {
  margin-bottom: 40px;
}
</style>
