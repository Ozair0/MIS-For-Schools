<template>
  <div class="MainHome">
    <Menu />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "~/components/HomePageComponents/Footer";
import Menu from "~/components/HomePageComponents/Menu";

export default {
  components: { Footer, Menu }
};
</script>

<style lang="scss">
.MainHome {
  display: flex;
  flex-direction: column;
}
</style>
