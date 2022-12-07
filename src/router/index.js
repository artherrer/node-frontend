import { createRouter, createWebHashHistory } from "vue-router";

import DashboardScreen from "../views/DashboardScreen.vue";
import EmployeeCreate from "../views/EmployeeCreate.vue";
import EmployeeEdit from "../views/EmployeeEdit.vue";
import LoginScreen from "../views/auth/LoginScreen.vue";
import SignupScreen from "../views/auth/SignupScreen.vue";

const routes = [
  { path: "/", component: DashboardScreen },
  { path: "/login", component: LoginScreen },
  { path: "/signup", component: SignupScreen },
  { path: "/employees/create", component: EmployeeCreate },
  { path: "/employees/:id/edit", component: EmployeeEdit, name: "EmployeesEdit" },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (loggedIn && publicPages.includes(to.path)) {
    return next("/");
  }

  next();
});

export default router;
