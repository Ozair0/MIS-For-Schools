<template>
  <div
    :class="
      `d-flex flex-column flex-shrink-0 text-white bg-dark dst sidebar p-3${
        sidebar ? ' hide_sidebar' : ''
      }`
    "
  >
    <a
      href="/"
      class="
        d-flex
        align-items-center
        mb-3 mb-md-0
        me-md-auto
        text-white text-decoration-none
      "
    >
      <span class="fs-4">KIS</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-5">
      <li
        v-for="(menuItem, menuItemIndex) in menuItems"
        :key="menuItemIndex"
        class="nav-item mb-2"
      >
        <NuxtLink
          :to="`${menuItem.page}`"
          @click.native="selectItem(menuItemIndex)"
          :class="`nav-link ${menuItem.active ? ' active' : ''}`"
        >
          <fa :icon="menuItem.icon" class="fa-1x me-2" color="white" />
          {{ menuItem.title }}
        </NuxtLink>

        <ul
          v-if="menuItem.subMenu.length > 0 && menuItem.active"
          class="nav nav-pills flex-column mx-3"
        >
          <li
            v-for="(menuSubItem, menuSubItemIndex) in menuItem.subMenu"
            :key="menuSubItemIndex"
            class="nav-item"
          >
            <NuxtLink
              :to="`${menuItem.page + menuSubItem.page}`"
              @click.native="selectSubItem(menuItemIndex, menuSubItemIndex)"
              :class="`nav-link m-1${menuSubItem.active ? ' active' : ''}`"
            >
              {{ menuSubItem.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    sidebar() {
      return this.$store.state.sidebar.sidebar;
    },
    menuItems() {
      return this.$store.state.menuList.menuItems;
    }
  },

  methods: {
    selectItem(menuItemIndex) {
      this.$store.commit("menuList/changeMenuItems", { menuItemIndex });
    },
    selectSubItem(menuItemIndex, menuSubItemIndex) {
      this.$store.commit("menuList/changeMenuSubItems", {
        menuItemIndex,
        menuSubItemIndex
      });
    }
  }
};
</script>
<style>
.nav-item > a {
  color: white !important;
}

.nav-item > a:hover {
  color: white !important;
  background-color: #0d6efd !important;
}

.dst {
  width: 280px;
  height: 100vh;
}
.sidebar {
  overflow-x: hidden;
  transition: 0.5s;
}

.hide_sidebar {
  width: 0;
  padding: 0 !important;
}

.slide_main {
  width: 100vw;
}
.Top_Menu {
  background-color: #0d6efd;
  padding-top: 10px;
  padding-bottom: 10px;
}
.Top_Side {
  margin: 10px;
}
</style>
