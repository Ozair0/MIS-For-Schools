<template>
  <div class="ContactUS_Main"><ContactUsBody /></div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import ContactUsBody from "~/components/ContactUSComponents/ContactUsBody";
export default {
  components: { ContactUsBody },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("showFooterImage/showHide", false);
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  layout: "public"
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
