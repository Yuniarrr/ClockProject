import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
new Vue({
  router,
  store,
  vuetify,
  pinia,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
