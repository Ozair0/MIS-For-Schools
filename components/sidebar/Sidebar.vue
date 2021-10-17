<template>
  <div
    :class="
      `d-flex flex-column flex-shrink-0 text-white bg-dark sidebar dst${
        sidebar ? ' hide_sidebar' : ' p-3'
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
    <div class="user-panel pb-1 mb-3 d-flex" style="overflow:unset !important;">
      <div class="image">
        <nuxt-img
          src="/OurTeam/Naseerullah.png"
          width="200"
          height="200"
          class="img-circle elevation-2"
          alt="User Image"
        />
      </div>
      <div class="info ml-4">
        <a href="#" class="d-block">Admin</a>
      </div>
    </div>
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
      if (this.$route.path.toString().includes("teacher_portal")) {
        return this.$store.state.teacherPortalMenuList.menuItems;
      } else {
        return this.$store.state.menuList.menuItems;
      }
    }
  },

  methods: {
    selectItem(menuItemIndex) {
      if (this.$route.path.toString().includes("teacher_portal")) {
        this.$store.commit("teacherPortalMenuList/changeMenuItems", {
          menuItemIndex
        });
      } else {
        this.$store.commit("menuList/changeMenuItems", { menuItemIndex });
      }
    },
    selectSubItem(menuItemIndex, menuSubItemIndex) {
      if (this.$route.path.toString().includes("teacher_portal")) {
        this.$store.commit("teacherPortalMenuList/changeMenuSubItems", {
          menuItemIndex,
          menuSubItemIndex
        });
      } else {
        this.$store.commit("menuList/changeMenuSubItems", {
          menuItemIndex,
          menuSubItemIndex
        });
      }
    }
  }
};
</script>
<style lang="scss">
.sidebar {
  .info {
    a {
      text-decoration: none;
      color: white;
    }
  }
}
.active {
  background: rgb(58, 176, 195) !important;
}
.nav-item > a {
  color: white !important;
}

.nav-item > a:hover {
  color: white !important;
  background-color: rgb(58, 176, 195) !important;
}

.dst {
  width: 280px;
  height: 100vh !important;

  padding: 0;
}
.sidebar {
  overflow-x: hidden;
  transition: 0.5s;
}

.hide_sidebar {
  width: 0;
  padding: 0 !important;
}
</style>
