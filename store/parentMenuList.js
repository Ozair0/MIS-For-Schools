import {
  faHome,
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faUsers,
  faUserTie,
  faBuilding,
  faChalkboard
} from "@fortawesome/free-solid-svg-icons";

export const state = () => ({
  menuItems: [
    {
      title: "Home",
      active: true,
      subMenu: [],
      page: "/parent_portal",
      icon: faHome
    },
    {
      title: "Attendance",
      active: false,
      subMenu: [],
      page: "/parent_portal/attendance",
      icon: faSchool
    },
    {
      title: "Subjects",
      active: false,
      subMenu: [],
      page: "/parent_portal/subjects",
      icon: faUserGraduate
    },
    {
      title: "Marks",
      active: false,
      subMenu: [],
      page: "/parent_portal/marks",
      icon: faChalkboard
    },
    {
      title: "Profile",
      active: false,
      subMenu: [],
      page: "/parent_portal/profile",
      icon: faUserTie
    }
  ]
});

export const mutations = {
  changeMenuItems(state, payload) {
    state.menuItems = state.menuItems.map((item, ind) => {
      item.active = ind === payload.menuItemIndex;
      item.subMenu.map(nItem => {
        nItem.active = false;
      });
      return item;
    });
  },
  changeMenuSubItems(state, payload) {
    state.menuItems = state.menuItems.map((item, ind) => {
      if (ind === payload.menuItemIndex) {
        item.subMenu.map((nItem, inde2) => {
          nItem.active = inde2 === payload.menuSubItemIndex;
        });
      }
      return item;
    });
  }
};
