<template>
  <div class="main_app">
    <Sidebar />
    <div class="d-flex flex-column slide_main">
      <div class="Top_Menu">
        <a href="#" @click.prevent="change()" class="Top_Side">
          <fa :icon="faBars" class="fa-2x" color="white" />
        </a>
      </div>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "~/components/sidebar/Sidebar";
export default {
  components: { Sidebar },
  middleware: ["auth", "checkUser"],
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/Admin/css/adminlte.min.css"
        }
      ],
      script: [
        {
          src: "/jquery-3.6.0.min.js",
          crossorigin: "anonymous"
        },
        {
          src: "/Admin/js/adminlte.min.js",
          type: "text/javascript"
        }
      ]
    };
  },
  computed: {
    faBars() {
      return faBars;
    }
  },
  methods: {
    change() {
      this.$store.commit("sidebar/showHide");
    }
  }
};
</script>

<style>
.Top_Side > i {
  color: red;
}
</style>
