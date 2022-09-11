<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon
          class="shrink mr-2 mt-1"
          transition="scale-transition"
          width="40"
          >mdi-clock-digital</v-icon
        >
        <span
          class="hidden-sm-and-down font-weight-light shrink mt-1"
          contain
          width="100"
          >Project Clock With Vue JS</span
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

    <div width="100%">
      <div class="float-end mt-16" width="50%">
        <ejs-sidebar>
          <ClockSettings
            v-if="CLOCK.settings.show_settings"
            class="pl-3 ml-3"
            style="z-index: 999"
          />
        </ejs-sidebar>
      </div>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import ClockSettings from "./components/ClockSettings.vue";
import { useClock } from "./store/index.js";

export default {
  name: "App",
  components: {
    ClockSettings,
  },
  setup() {
    const CLOCK = useClock();
    return {
      CLOCK,
    };
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
</style>
