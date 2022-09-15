<template>
  <v-container>
    <v-row xs="6" sm="6" md="6">
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowAlarms()">
          <v-icon size="50">mdi-clock</v-icon>
        </v-btn>
        <br />
        <i>Alarm</i>
        <br />
        <span>{{ ALARM.time }}</span>
        <br />
        <v-card v-if="CLOCK.settings.show_alarm" class="mt-2">
          <v-card-title class="mb-n3 mx-auto" align="center" justify="center">
            <!-- <v-text-field
              label="Alarm Time"
              type="time"
              prepend-icon="mdi-clock"
              @change="ALARM.SetAlarm()"
              class="mb-n3 alarm-time"
            ></v-text-field> -->
            <div align="center" justify="center">
              <v-icon>mdi-clock</v-icon>
              <input type="time" placeholder="Alarm Time" v-model="ALARM.time_save" class="alarm-time" />
            </div>
          </v-card-title>
          <div class="mb-2">
            <!-- <label for="satu" class="mb-1">
              Alarm Time
              <input
                type="time"
                id="satu"
              />
            </label> -->
          </div>
          <!-- <v-card-text class="mb-n3">
            <v-text-field
              v-model="ALARM.message"
              label="Alarm Message"
              prepend-icon="mdi-message"
              @change="ALARM.SetAlarm()"
            ></v-text-field>
          </v-card-text> -->
          <div>
            <v-btn class="mb-3" @click="ALARM.alarm === 'Set Alarm' ? ALARM.SetAlarm() : ALARM.CancelAlarm()"> {{ALARM.alarm}} </v-btn>
            <div v-if="ALARM.display">
              <v-btn class="mx-1 mb-5" @click="ALARM.SnoozeAlarm()">
                Snooze for 5s
              </v-btn>
              <v-btn class="mx-1 mb-5" @click="ALARM.StopAlarm()">
                Stop Alarm
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowCountdown()">
          <v-icon size="50">mdi-counter</v-icon>
        </v-btn>
        <br />
        <i>Time Countdown</i>
        <br />
        <v-card v-if="CLOCK.settings.show_countdown" class="mt-2">
          <v-card-title>
            <v-card-text>
              <br />
              <span>{{ COUNTDOWN.data.timeLeft }}</span>
              <br />
              Countdown ends at <span>{{ COUNTDOWN.data.endTime }}</span>
              <br />
              <ul>
                <li v-for="(time, index) in COUNTDOWN.data.times" :key="index">
                  <a
                    v-on:click.prevent="COUNTDOWN.setTime(time.sec)"
                    :class="[
                      'button',
                      'is-link',
                      {
                        'is-active': time.sec === selectedTime && endTime !== 0,
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
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowStopwatch()">
          <v-icon size="50">mdi-timer</v-icon>
        </v-btn>
        <br />
        <i>Stopwatch</i>
        <br />
        <v-card v-if="CLOCK.settings.show_stopwatch" class="mt-2">
          <v-card-title>
            <v-card-text>
              <span>{{ STOPWATCH.time }}</span>
              <br />
              <v-btn @click="STOPWATCH.StartStopwatch()" class="mx-1"
                >Start</v-btn
              >
              <v-btn @click="STOPWATCH.StopStopwatch()" class="mx-1"
                >Stop</v-btn
              >
              <v-btn @click="STOPWATCH.ResetStopwatch()" class="mx-1 my-1"
                >Reset</v-btn
              >
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  useClock,
  useCountdown,
  useStopwatch,
  useAlarm,
} from "@/store/index.js";

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
  created() {
    setInterval(() => {
      // this.COUNTDOWN.StartCountdown();
      // this.COUNTDOWN.countdown();
    }, 1000);
  },
};
</script>