<template>
  <div class="Our_Vision_Main">
    <Page_Info title="Our Vision" />
    <div class="Our_Vision_Cards">
      <VisionCard
        title="Vision"
        body="Our vision is to inspire students towards excellence and progress in a safe, value-based learning<br>environment."
        image="Vision.jpg"
      />
      <VisionCard
        title="Mission"
        body="Our mission is to nurture character and academic excellence through quality in learning, teaching,<br>curriculum design, and integration of technology."
        image="14.jpg"
        end
      />
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

import Page_Info from "~/components/Page_Info";
import VisionCard from "~/components/OurVisionComponents/VisionCard";
export default {
  components: { VisionCard, Page_Info },
  mounted() {
    this.$nextTick(() => {
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
.Our_Vision_Main {
  .Our_Vision_Cards {
    display: flex;
    flex-direction: column;
    margin: 20px 30px 30px;
  }
}
</style>
