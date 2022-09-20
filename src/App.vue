<template>
  <v-app
    :class="{
      imageBackground: CLOCK.settings.img == 'use',
    }"
  >
    <span class="bg"></span>
    <div>
      <v-app-bar app color="blue darken-3" dark>
        <div class="d-flex align-center">
          <v-icon class="shrink mr-2 mt-1" transition="scale-transition" width="40"
            >mdi-clock-digital</v-icon
          >
          <span
            class="hidden-sm-and-down font-weight-light shrink mt-1"
            contain
            width="100"
            >Project Clock With Vue JS || Midyanisa Yuniar</span
          >
        </div>

        <v-spacer></v-spacer>

        <v-btn target="_blank" text @click="DarkMode()">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-btn target="_blank" text @click="CLOCK.ToggleSettings()">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <div width="100%">
      <div class="float-end mt-16" width="50%">
        <div>
          <ClockSettings
            v-if="CLOCK.settings.show_settings"
            class="pl-3 ml-3"
            style="opacity: 0.9"
          />
        </div>
      </div>
      <v-main>
        <router-view />
      </v-main>
      <PopUpAlarm />
    </div>
  </v-app>
</template>

<script>
import ClockSettings from "./components/ClockSettings.vue";
import PopUpAlarm from "./components/PopUpAlarm.vue";
import { useClock } from "./store/index.js";

export default {
  name: "App",
  data: () => ({
    overlay: false,
    absolute: true,
  }),
  setup() {
    const CLOCK = useClock();
    return {
      CLOCK,
    };
  },
  watch: {
    overlay(val) {
      val && this.CLOCK.settings.show_settings;
    },
  },
  components: {
    ClockSettings,
    PopUpAlarm,
  },
  methods: {
    DarkMode() {
      return (this.$vuetify.theme.dark = !this.$vuetify.theme.dark);
    },
  },
};
</script>

<style>
* {
  font-family: "Share Tech Mono", monospace;
}
/* .imageBackground {
  background: url("https://www.itl.cat/pngfile/big/246-2469733_lake-wanaka-new-zealand-17167-wallpaper-beautiful-lakes.jpg")
    no-repeat center center fixed !important;
  background-size: cover;
} */
</style>
