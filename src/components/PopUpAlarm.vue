<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="ALARM.showMessage" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Alarm Message:</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-h6">{{ ALARM.message }}</v-card-text>
          <v-card-actions class="flex justify-space-around">
            <v-btn color="primary" text @click="ALARM.StopAlarm(ALARM.index)">
              Close
            </v-btn>
            <v-btn color="primary" text @click="ALARM.SnoozeAlarm()">
              Snooze For 5s
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="COUNTDOWN.showMessage" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Time Countdown</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-h6">TIME'S UP</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="COUNTDOWN.stopCountDown()">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { useAlarm, useCountdown } from "@/store/index.js";

export default {
  setup() {
    const ALARM = useAlarm();
    const COUNTDOWN = useCountdown();
    return {
      ALARM,
      COUNTDOWN,
    };
  },
};
</script>
