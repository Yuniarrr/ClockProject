import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
new Vue({
  router,
  store,
  vuetify,
  pinia,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
