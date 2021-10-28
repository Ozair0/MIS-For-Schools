import {
  faHome,
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faUsers,
  faUserTie,
  faBuilding,
  faChalkboard,
  faGraduationCap,
  faBookOpen,
  faWallet,
  faBookReader,
  faChartBar,
  faSearch,
  faCalendarWeek,
  faUserTag,
  faBus
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
          page: "/promote_student"
        },
        {
          title: "Promote All Student",
          active: false,
          page: "/promote_all_students"
        }
      ],
      page: "/admin/students",
      icon: faUserGraduate
    },
    {
      title: "Attendance Management",
      active: false,
      subMenu: [],
      page: "/admin/attendance",
      icon: faGraduationCap
    },
    // {
    //   title: "Fees Management",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faWallet
    // },
    {
      title: "Exams Management",
      active: false,
      subMenu: [],
      page: "/admin/exams",
      icon: faBookReader
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
        }
      ],
      page: "/admin/classes",
      icon: faSchool
    },
    {
      title: "Subjects Management",
      active: false,
      subMenu: [
        {
          title: "Create Subject",
          active: false,
          page: "/create_subject"
        },
        {
          title: "Select Subjects",
          active: false,
          page: "/select_subject"
        },
        {
          title: "Manage Subject Selection",
          active: false,
          page: "/manage_subject_selection"
        }
      ],
      page: "/admin/subjects",
      icon: faChalkboard
    },
    // {
    //   title: "Transports Management",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faBus
    // },
    // {
    //   title: "Library Management",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faBookOpen
    // },
    {
      title: "Departments",
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
        }
      ],
      page: "/admin/teacher",
      icon: faChalkboardTeacher
    },
    {
      title: "Employee Management",
      active: false,
      subMenu: [
        { title: "Add Employee", active: false, page: "/add_employee" }
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
    }
    // {
    //   title: "Teacher Evaluation",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faSearch
    // },
    // {
    //   title: "HR & Payroll",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faChartBar
    // },
    // {
    //   title: "Timetable Management",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faCalendarWeek
    // },
    // {
    //   title: "User Roles & Permissions",
    //   active: false,
    //   subMenu: [
    //     {
    //       title: "Add Parent",
    //       active: false,
    //       page: "/add_parent"
    //     }
    //   ],
    //   page: "/admin/parent",
    //   icon: faUserTag
    // }
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
