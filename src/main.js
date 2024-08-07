import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import store from "./store";
import "./assets/styles.css";

import AOS from "aos";
import "aos/dist/aos.css";
import "parallax-js";

const app = createApp(App);

app.use(router).use(i18n).use(store).mount("#app");
AOS.init({
  duration: 1000,
});
