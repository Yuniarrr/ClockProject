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
import { useClock, useCountdown } from "./store/index.js";

export default {
  name: "App",
  setup() {
    const CLOCK = useClock();
    const COUNTDOWN = useCountdown();
    return {
      CLOCK,
      COUNTDOWN,
    };
  },
  watch: {},
  components: {
    ClockSettings,
    PopUpAlarm,
  },
  methods: {
    DarkMode() {
      return (this.$vuetify.theme.dark = !this.$vuetify.theme.dark);
    },
  },
  watch: {
    ALARM: {
      handler() {
        ALARM.list_alarm.forEach((alarm) => {
          if (alarm[3]) {
            alarm.SetAlarm(alarm);
          }
        });
      },
    },
    "COUNTDOWN.data.selectedTime": {
      handler() {
        let countdown = this.COUNTDOWN;
        if (countdown.data.selectedTime != 0) {
          countdown.setTime(countdown.data.selectedTime);
        }
      },
      deep: true,
    },
  },
  created() {
    let countdown = this.COUNTDOWN;
    if (countdown.data.selectedTime != 0) {
      countdown.setTime(countdown.data.selectedTime);
    }
    console.log(this.COUNTDOWN.data.selectedTime);
  },
};
</script>

<style>
*,
#noon {
  font-family: "Share Tech Mono", monospace;
}
/* .imageBackground {
  background: url("https://www.itl.cat/pngfile/big/246-2469733_lake-wanaka-new-zealand-17167-wallpaper-beautiful-lakes.jpg")
    no-repeat center center fixed !important;
  background-size: cover;
} */
</style>
