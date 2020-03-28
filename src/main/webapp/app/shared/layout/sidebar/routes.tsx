import Sidebar from "app/shared/layout/sidebar/Sidebar";

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-shop",
    layout: "/dashboard"
  },
  {
    path: "/prisoners",
    name: "Prisoners",
    icon: "nc-icon nc-single-02",
    layout: "/dashboard"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-circle-10",
    layout: "/dashboard"
  },
];
export default routes;
