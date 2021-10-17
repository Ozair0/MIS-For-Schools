<template>
  <div class="main_app">
    <Sidebar />
    <div class="d-flex flex-column slide_main">
      <div class="Top_Menu shadow">
        <a href="#" @click.prevent="change()" class="Top_Side">
          <fa :icon="faBars" class="fa-2x" color="white" />
        </a>
        <div class="Top_Profile">
          <button
            class="btn btn-danger shadow Logout_BTN"
            @click.prevent="logOut()"
          >
            Logout
          </button>
        </div>
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
    },
    logOut() {
      this.$auth.logout();
      this.$router.push(`/Login/3`);
    }
  }
};
</script>

<style lang="scss" scoped>
.main_app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  transition: margin-left 0.5s;

  .slide_main {
    width: 100vw;
    overflow-y: scroll;
    .Top_Menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(58, 176, 195);
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      .Top_Profile {
        margin-right: 10px;
        .Logout_BTN {
          border-radius: 25px;
        }
      }
      .Top_Side {
        margin: 10px;
      }
    }
  }
  //background-color: #d6d6d6;
}
</style>
