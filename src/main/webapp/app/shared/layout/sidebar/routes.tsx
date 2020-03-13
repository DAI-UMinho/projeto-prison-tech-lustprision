/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Sidebar from "app/shared/layout/sidebar/Sidebar";

const routes = [
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-bank",
    layout: "/dashboard"
  },
  {
    path: "/password",
    name: "Password",
    icon: "nc-icon nc-diamond",
    layout: "/dashboard"
  },
];
export default routes;
