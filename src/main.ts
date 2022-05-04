import { createApp } from "vue";
import App from "./App.vue";
import VueSnip from 'vue-snip'

import './assets/global.css';

createApp(App).use(VueSnip).mount("#app");
