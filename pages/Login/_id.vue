<template>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <nuxt-img
              src="/facility_login.jpg"
              format="webp"
              class="login-card-img"
            />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
                <nuxt-img
                  src="/Title.png"
                  format="webp"
                  alt="logo"
                  class="logo"
                />
              </div>

              <p
                v-if="parseInt(this.$route.params.id) === 4"
                class="login-card-description"
              >
                Parents Portal
              </p>
              <p
                v-else-if="parseInt(this.$route.params.id) === 3"
                class="login-card-description"
              >
                Employees Portal
              </p>
              <p
                v-else-if="parseInt(this.$route.params.id) === 2"
                class="login-card-description"
              >
                Teachers Portal
              </p>
              <p v-else class="login-card-description">Students Portal</p>
              <form action="#" v-if="!this.$auth.loggedIn">
                <div class="form-group">
                  <label for="UserID" class="sr-only">User ID</label>
                  <input
                    type="text"
                    name="User-ID"
                    id="UserID"
                    class="form-control"
                    placeholder="User ID"
                    v-model="userid"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="password" class="sr-only">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <input
                  name="login"
                  id="login"
                  class="btn btn-block login-btn mb-4"
                  type="submit"
                  value="Sign In"
                  @click.prevent="SignIn"
                />
              </form>
              <input
                v-if="this.$auth.loggedIn"
                name="signout"
                id="signout"
                class="btn btn-block login-btn mb-4"
                type="button"
                value="Sign Out"
                @click.prevent="SignOut"
              />
              <nuxt-link to="/" class="forgot-password-link"
                >Home Page</nuxt-link
              >
              <p
                v-if="parseInt(this.$route.params.id) === 4"
                class="login-card-footer-text"
              >
                Student?
                <nuxt-link to="/Login/1" class="text-reset"
                  >Student Sign In Page</nuxt-link
                >
              </p>
              <p
                v-if="
                  parseInt(this.$route.params.id) === undefined ||
                    parseInt(this.$route.params.id) === 1
                "
                class="login-card-footer-text"
              >
                Parent?
                <nuxt-link to="/Login/4" class="text-reset"
                  >Parent Sign In Page</nuxt-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/bootstrap.min.css"
        },
        {
          rel: "stylesheet",
          href: "/login.css"
        }
      ]
      // script: [
      //   {
      //     src: "/jquery-3.6.0.min.js",
      //     crossorigin: "anonymous"
      //   },
      //   {
      //     src: "/Admin/js/adminlte.min.js",
      //     type: "text/javascript"
      //   }
      // ]
    };
  },
  created() {
    if (
      this.$route.params.id === undefined ||
      this.$route.params.id <= 0 ||
      this.$route.params.id >= 5
    ) {
      this.$router.push("/Login/1");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
      // document.querySelector(
      //   ".login-card-img"
      // ).style.background = `url('${this.$img("/14.jpg", { format: "webp" })}')`;
    });
    // console.log(this.$auth.user);
    // console.log(this.$auth.loggedIn);
  },

  layout: "empty",
  data() {
    return {
      id: this.$route.params.id,
      userid: null,
      password: null
    };
  },
  computed: {
    // isLoggedIn() {
    //   return this.$store.state.auth.isLoggedIn;
    // }
  },
  methods: {
    SignIn() {
      if (this.$auth.loggedIn) {
        this.$auth.logout();
      } else {
        this.$auth
          .loginWith("local", {
            data: {
              userid: this.userid,
              password: this.password,
              type: parseInt(
                this.$route.params.id === undefined ? 1 : this.$route.params.id
              )
            }
          })
          .then(async () => {
            if (parseInt(this.$route.params.id) === 1) {
              this.$router.push("/student_portal");
            } else if (parseInt(this.$route.params.id) === 2) {
              this.$router.push("/teacher_portal");
            } else if (parseInt(this.$route.params.id) === 3) {
              await this.$auth.fetchUser().then(res => {
                if (!res.data.user[0].isadmin) {
                  this.$router.push("/employee_portal");
                } else {
                  this.$router.push("/Admin");
                }
              });
            } else if (parseInt(this.$route.params.id) === 4) {
              this.$router.push("/parent_portal");
            }
          });
      }
    },
    SignOut() {
      this.$auth.logout();
      this.$router.push(`/Login/${this.$route.params.id}`);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/*@import "./resources/assets/sass/variables";*/
</style>
