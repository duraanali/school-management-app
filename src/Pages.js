import Dashboard from "./components/pages/Dashboard";
import Admins from "./components/pages/admins/Admins";
import Classes from "./components/pages/classes/Classes";
import Parents from "./components/pages/parents/Parents";
import Students from "./components/pages/students/Students";
import Teachers from "./components/pages/teachers/Teachers";
import Settings from "./components/pages/settings/settings";
import Logout from "./components/pages/Logout"


var Pages = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/AdminAccount"
  },
  {
    path: "/students",
    name: "Students",
    icon: "nc-icon nc-paper",
    component: Students,
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
    path: "/classes",
    name: "Classes",
    icon: "nc-icon nc-bank",
    component: Classes,
    layout: "/AdminAccount"
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "nc-icon nc-circle-10",
    component: Teachers,
    layout: "/AdminAccount"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "nc-icon nc-button-pause",
    component: Admins,
    layout: "/AdminAccount"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-settings",
    component: Settings,
    layout: "/AdminAccount"
  }
  ,
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "/AdminAccount"
  }
];
export default Pages;