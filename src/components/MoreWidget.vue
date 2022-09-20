<template>
  <v-container>
    <v-row xs="6" sm="6" md="6">
      <v-col>
        <v-btn target="_blank" text class="mb-2" large @click="CLOCK.ShowAlarms()">
          <v-icon size="50">mdi-clock</v-icon>
        </v-btn>
        <br />
        <i>Alarm</i>
        <span>{{ ALARM.time }}</span>
        <br />
        <v-card v-if="CLOCK.settings.show_alarm" class="mt-2">
          <v-card-title class="mb-n3 mx-auto" align="center" justify="center">
            <v-text-field
              label="Alarm Time"
              type="time"
              prepend-icon="mdi-clock"
              class="mb-n3"
              id="alarmTime"
              v-model="ALARM.time_save"
            ></v-text-field>
            <v-text-field
              label="Alarm Message"
              type="text"
              prepend-icon="mdi-message-text"
              class="mb-n3"
              v-model="ALARM.message"
            ></v-text-field>
          </v-card-title>
          <div>
            <v-btn
              class="mb-3"
              @click="
                ALARM.alarm === 'Set Alarm' ? ALARM.SetAlarm() : ALARM.CancelAlarm()
              "
            >
              {{ ALARM.alarm }}
            </v-btn>
            <div v-if="ALARM.display">
              <v-btn class="mx-1 mb-5" @click="ALARM.SnoozeAlarm()">
                Snooze for 5s
              </v-btn>
              <v-btn class="mx-1 mb-5" @click="ALARM.StopAlarm()"> Stop Alarm </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowCountdown()" large>
          <v-icon size="50">mdi-counter</v-icon>
        </v-btn>
        <br />
        <i>Time Countdown</i>
        <br />
        <v-card v-if="CLOCK.settings.show_countdown" class="mt-2">
          <v-card-title>
            <v-card-text>
              <span class="text-subtitle-1">{{ COUNTDOWN.data.timeLeft }}</span>
              <div v-if="COUNTDOWN.data.selectedTime != 0">
                <v-btn x-small @click="COUNTDOWN.stopCountDown()">STOP</v-btn>
              </div>
              <br />
              Countdown ends at <span>{{ COUNTDOWN.data.endTime }}</span>
              <br />
              <ul>
                <li
                  v-for="(time, index) in COUNTDOWN.data.times"
                  :key="index"
                  style="list-style-type: none"
                >
                  <a
                    v-on:click.prevent="COUNTDOWN.setTime(time.sec)"
                    :class="[
                      'button',
                      'is-link',
                      {
                        'is-active':
                          time.sec === COUNTDOWN.data.selectedTime &&
                          COUNTDOWN.data.endTime !== 0,
                      },
                    ]"
                    >{{ time.display }}</a
                  >
                </li>
              </ul>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowStopwatch()" large>
          <v-icon size="50">mdi-timer</v-icon>
        </v-btn>
        <br />
        <i>Stopwatch</i>
        <v-card v-if="CLOCK.settings.show_stopwatch" class="mt-2">
          <v-card-title>
            <v-card-text>
              <span>{{ STOPWATCH.time }}</span>
              <br />
              <v-btn @click="STOPWATCH.StartStopwatch()" class="mx-1">Start</v-btn>
              <v-btn @click="STOPWATCH.StopStopwatch()" class="mx-1">Stop</v-btn>
              <v-btn @click="STOPWATCH.ResetStopwatch()" class="mx-1 my-1">Reset</v-btn>
              <v-btn @click="STOPWATCH.RoundStopwatch()" class="mx-1 my-1">Round</v-btn>
              <ul
                v-if="STOPWATCH.rounds != 0"
                class="mt-2"
                style="list-style-type: circle"
                center
              >
                <li v-for="(round, index) in STOPWATCH.rounds" :key="index">
                  {{ round }}
                </li>
              </ul>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useClock, useCountdown, useStopwatch, useAlarm } from "@/store/index.js";

export default {
  setup() {
    const CLOCK = useClock();
    const COUNTDOWN = useCountdown();
    const STOPWATCH = useStopwatch();
    const ALARM = useAlarm();
    return {
      CLOCK,
      COUNTDOWN,
      STOPWATCH,
      ALARM,
    };
  },
};
</script>
