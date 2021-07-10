import {
  faHome,
  faAtlas,
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faUsers,
  faUserTie,
  faBook
} from "@fortawesome/free-solid-svg-icons";
export const state = () => ({
  menuItems: [
    { title: "Home", active: true, subMenu: [], page: "/admin", icon: faHome },
    {
      title: "Manage Website",
      active: false,
      subMenu: [
        {
          title: "Create Posts",
          active: false,
          page: "/create_posts"
        },
        {
          title: "Manage Pages",
          active: false,
          page: "/manage_posts"
        },
        {
          title: "Upload Events",
          active: false,
          page: "/upload_events"
        }
      ],
      page: "/admin/website",
      icon: faAtlas
    },
    {
      title: "Students Management",
      active: false,
      subMenu: [
        {
          title: "View Students",
          active: false,
          page: "/view"
        }
      ],
      page: "/admin/students",
      icon: faUserGraduate
    },
    {
      title: "Teachers Management",
      active: false,
      subMenu: [],
      page: "/admin/teacher",
      icon: faChalkboardTeacher
    },
    {
      title: "Employee Management",
      active: false,
      subMenu: [],
      page: "/admin/employee",
      icon: faUserTie
    },
    {
      title: "Parents Management",
      active: false,
      subMenu: [
        {
          title: "Add Parents",
          active: false,
          page: "/add_parents"
        },
        {
          title: "Manage Parents",
          active: false,
          page: "/manage_parents"
        }
      ],
      page: "/admin/parent",
      icon: faUsers
    },
    {
      title: "Class Management",
      active: false,
      subMenu: [
        {
          title: "Create Class",
          active: false,
          page: "/create_class"
        },
        {
          title: "Manage Classes",
          active: false,
          page: "/manage_classes"
        }
      ],
      page: "/admin/classes",
      icon: faSchool
    },
    {
      title: "Subject Management",
      active: false,
      subMenu: [
        {
          title: "Create Subject",
          active: false,
          page: "/create_subject"
        },
        {
          title: "Manage Subjects",
          active: false,
          page: "/manage_subjects"
        }
      ],
      page: "/admin/subject",
      icon: faBook
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
