import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import authStore from "../store/auth";

import "bootstrap/dist/css/bootstrap.css";

// Sweet alert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.use(Router);
app.use(authStore);
app.use(VueSweetalert2);
app.mount("#app");

