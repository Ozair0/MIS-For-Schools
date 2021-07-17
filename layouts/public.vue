<template>
  <div class="MainHome">
    <Menu />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "~/components/Footer";
import Menu from "~/components/Menu";

export default {
  loading: {
    color: "green",
    height: "10px",
    continuous: true
  },
  components: { Footer, Menu }
};
</script>

<style lang="scss">
.MainHome {
  display: flex;
  flex-direction: column;
}
</style>
