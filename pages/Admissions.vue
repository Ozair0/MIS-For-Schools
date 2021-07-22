<template>
  <div>Admissions</div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  layout: "public",
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
