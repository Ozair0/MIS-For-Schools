<template>
  <div class="Page_Info">
    <p class="Page_Info_Title">{{ title }}</p>
    <div class="Page_Info_Links">
      <a href="/">Home</a>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6"
          cy="6"
          r="5"
          stroke="#3FFF8C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="4 4"
        />
      </svg>

      <a href="#">{{ title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector(
        ".Page_Info"
      ).style.background = `linear-gradient(0deg,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url('${this.$img(
        "/14.jpg",
        { format: "webp" }
      )}')`;
    });
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Page_Info {
  height: 325px;
  background-position-y: -60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .Page_Info_Title {
    margin-left: 90px;
    margin-top: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    color: white;
  }
  .Page_Info_Links {
    display: flex;
    align-items: center;
    margin-left: 120px;
    margin-top: 80px;
    svg {
      margin: 0 6px;
    }
    a {
      text-decoration: none;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: white;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .Page_Info {
    background-position-x: -150px;
  }
}
@media only screen and (max-width: 768px) {
  .Page_Info {
    background-position-x: -300px;
    .Page_Info_Title {
      margin-left: auto;
      margin-right: auto;
    }
    .Page_Info_Links {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
