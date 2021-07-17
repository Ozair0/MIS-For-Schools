<template>
  <div class="About_Page">
    <Page_Info title="About Kardan International School" />
    <AboutPageBody />
    <div class="About_Cards">
      <About_Card
        title="Pedagogical Innovation"
        body="Technology orientation and<br>enhanced digitization of<br>curriculum and teaching<br>methods"
        icon="Sizer.svg"
        color="#663695"
      />
      <About_Card
        title="IT Systems"
        body="Dedicated system<br>infrastructure to facilitate<br>administrative/faculty<br>coordination and content<br>delivery"
        icon="Pen.svg"
        color="#488F00"
      />
      <About_Card
        title="Pedagogical Innovation"
        body="Data-driven models enabling<br>real-time student progress<br>reports to identify deficiencies<br>and enable teachers to develop<br>appropriate teaching methods"
        icon="Phone.svg"
        color="#66CC00"
      />
    </div>
  </div>
</template>
<script>
import Page_Info from "~/components/Page_Info";
import AboutPageBody from "~/components/AboutPageComponents/AboutPageBody";
import About_Card from "~/components/AboutPageComponents/About_Card";
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  components: {
    Page_Info,
    AboutPageBody,
    About_Card
  },
  layout: "public"
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.About_Page {
  .About_Cards {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
    margin-bottom: 50px;
  }
}
@media only screen and (max-width: 1024px) {
  .About_Page {
    .About_Cards {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
