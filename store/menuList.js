import {
  faHome,
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faUsers,
  faUserTie,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
export const state = () => ({
  menuItems: [
    { title: "Home", active: true, subMenu: [], page: "/admin", icon: faHome },
    // {
    //   title: "Manage Website",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Create Posts",
    //       active: false,
    //       page: "/create_posts"
    //     },
    //     {
    //       title: "Manage Pages",
    //       active: false,
    //       page: "/manage_posts"
    //     },
    //     {
    //       title: "Upload Events",
    //       active: false,
    //       page: "/upload_events"
    //     }
    //   ],
    //   page: "/admin/website",
    //   icon: faAtlas
    // },
    {
      title: "Students Management",
      active: false,
      subMenu: [
        {
          title: "Add Student",
          active: false,
          page: "/add_student"
        },
        {
          title: "Promote Student",
          active: false,
          page: "/add_student"
        }
      ],
      page: "/admin/students",
      icon: faUserGraduate
    },
    {
      title: "Departments Management",
      active: false,
      subMenu: [
        {
          title: "Add Department",
          active: false,
          page: "/add_department"
        }
      ],
      page: "/admin/department",
      icon: faBuilding
    },
    {
      title: "Teachers Management",
      active: false,
      subMenu: [
        {
          title: "Add Teacher",
          active: false,
          page: "/add_teacher"
        },
        {
          title: "Promote Teacher",
          active: false,
          page: "/add_teacher"
        }
      ],
      page: "/admin/teacher",
      icon: faChalkboardTeacher
    },
    {
      title: "Employee Management",
      active: false,
      subMenu: [
        { title: "Add Employee", active: false, page: "/add_employee" },
        { title: "Promote Employee", active: false, page: "/add_employee" }
      ],
      page: "/admin/employee",
      icon: faUserTie
    },
    {
      title: "Parents Management",
      active: false,
      subMenu: [
        {
          title: "Add Parent",
          active: false,
          page: "/add_parent"
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
          title: "Create Classrooms",
          active: false,
          page: "/create_class"
        },
        {
          title: "Create Grades",
          active: false,
          page: "/create_grade"
        },
        {
          title: "Manage Grades",
          active: false,
          page: "/manage_grades"
        },
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
      page: "/admin/classes",
      icon: faSchool
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
