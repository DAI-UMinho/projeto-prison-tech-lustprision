import Sidebar from "app/shared/layout/sidebar/Sidebar";

export const adminRoutes = [
  {
    path: "/employees",
    name: "Funcionários",
    icon: "nc-icon nc-shop",
    layout: "/dashboard"
  },
];

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-shop",
    layout: "/dashboard"
  },
  {
    path: "/prisoners",
    name: "Presidiários",
    icon: "nc-icon nc-single-02",
    layout: "/dashboard"
  },
  {
    path: "/products",
    name: "Produtos",
    icon: "nc-icon nc-bag-16",
    layout: "/dashboard"
  },
  {
    path: "/works",
    name: "Trabalhos",
    icon: "nc-icon nc-briefcase-24",
    layout: "/dashboard"
  },
  {
    path: "/quizs",
    name: "Quizes",
    icon: "nc-icon nc-paper",
    layout: "/dashboard"
  },
  {
    path: "/profile",
    name: "Perfil",
    icon: "nc-icon nc-circle-10",
    layout: "/dashboard"
  },
];
export default routes;
