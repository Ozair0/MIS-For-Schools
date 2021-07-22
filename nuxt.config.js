module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  render: {
    compressor: false,
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000
    }
  },
  head: {
    title: "KIS",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "This Is Kardan international School Official Website"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      // {
      //   src: "/bootstrap.bundle.min.js",
      //   type: "text/javascript"
      // }
      // {
      //   src: "/Admin/js/adminlte.min.js",
      //   type: "text/javascript"
      // }
      // {
      //   src: "/jquery-3.6.0.min.js",
      //   crossorigin: "anonymous"
      // },
      // {
      //   src: "/Admin/js/adminlte.min.js",
      //   type: "text/javascript"
      // }
    ]
  },
  loading: {
    color: "#663695",
    height: "3px",
    continuous: true
  },

  // Only works when mode: 'spa'
  // loadingIndicator: {
  //   name: "circle",
  //   color: "#3B8070",
  //   background: "white"
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    "~/assets/style.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/fragment.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-fontawesome", "@nuxt/image"],
  fontawesome: {
    component: "fa"
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  telemetry: false
};
