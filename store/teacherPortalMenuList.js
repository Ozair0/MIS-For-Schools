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
      page: "/teacher_portal",
      icon: faHome
    },
    {
      title: "Subjects",
      active: false,
      subMenu: [
        // {
        //   title: "Take Attendance",
        //   active: false,
        //   page: "/add_student"
        // },
        {
          title: "Subjects Teaching",
          active: false,
          page: "/"
        }
      ],
      page: "/teacher_portal/subjects",
      icon: faUserGraduate
    },
    {
      title: "Marks",
      active: false,
      subMenu: [],
      page: "/teacher_portal/marks",
      icon: faChalkboard
    },
    {
      title: "Profile",
      active: false,
      subMenu: [],
      page: "/teacher_portal/profile",
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
