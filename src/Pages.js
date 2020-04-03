import Dashboard from "./components/pages/Dashboard";
import Admins from "./components/pages/admins/Admins";
import Icons from "./components/pages/Icons";
import Classes from "./components/pages/classes/Classes";
import Parents from "./components/pages/parents/Parents";
import Students from "./components/pages/students/Students";
import Teachers from "./components/pages/teachers/Teachers";
import LoginForm from "./components/login/LoginForm"
import StudentEdit from "./components/pages/students/StudentEdit";
import StudentAdd from "./components/pages/students/StudentAdd";

var Pages = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/AdminAccount"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/AdminAccount"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "nc-icon nc-pin-3",
    component: Admins,
    layout: "/AdminAccount"
  },
  {
    path: "/classes",
    name: "Classes",
    icon: "nc-icon nc-bell-55",
    component: Classes,
    layout: "/AdminAccount"
  },
  {
    path: "/parents",
    name: "Parents",
    icon: "nc-icon nc-single-02",
    component: Parents,
    layout: "/AdminAccount"
  },
  {
    path: "/students",
    name: "Students",
    icon: "nc-icon nc-tile-56",
    component: Students,
    layout: "/AdminAccount"
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "nc-icon nc-caps-small",
    component: Teachers,
    layout: "/AdminAccount"
  },
  {
    path: "/studentedit/:id",
    name: "Student Edit",
    icon: "nc-icon nc-caps-small",
    component: StudentEdit,
    layout: "/AdminAccount"
  },
  {
    path: "/studentadd",
    name: "Student Add",
    icon: "nc-icon nc-caps-small",
    component: StudentAdd,
    layout: "/AdminAccount"
  }
];
export default Pages;