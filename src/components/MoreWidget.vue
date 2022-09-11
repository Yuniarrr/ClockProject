<template>
  <v-container>
    <v-row xs="6" sm="6" md="6">
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowAlarms()">
          <v-icon size="50">mdi-clock</v-icon>
        </v-btn>
        <br />
        <i>Alarm</i>
        <v-card v-if="CLOCK.settings.show_alarm" absolute top center>
          <v-row>
            <v-col>
              <v-btn fab absolute top right @click="CLOCK.ShowAlarms()">
                <!-- <v-icon> mdi-plus </v-icon> -->
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
              <v-card-title>
                <v-text-field
                  v-model="CLOCK.AlarmTime"
                  label="Alarm Time"
                  type="time"
                  step="1"
                  prepend-icon="mdi-clock"
                  @change="CLOCK.SetAlarm()"
                ></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="CLOCK.AlarmMessage"
                  label="Alarm Message"
                  prepend-icon="mdi-message"
                  @change="CLOCK.SetAlarm()"
                ></v-text-field>
              </v-card-text>
              <!-- </v-col>
            <v-col> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-btn target="_blank" text class="mb-2" @click="CLOCK.ShowCountdown()">
          <v-icon size="50">mdi-counter</v-icon>
        </v-btn>
        <br />
        <i>Time Countdown</i>
        <v-card v-if="CLOCK.settings.show_countdown">
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
                  >{{ time.display }}</a>
                </li>
              </ul>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-btn target="_blank" text class="mb-2">
          <v-icon size="50" @click="CLOCK.ShowStopwatch()">mdi-timer</v-icon>
        </v-btn>
        <br />
        <i>Stopwatch</i>
        <v-card v-if="CLOCK.settings.show_stopwatch">
          <v-card-title>
            <v-card-text>
              <br />
              <span>{{ STOPWATCH.time }}</span>
              <br />
              <v-btn
                @click="STOPWATCH.StartStopwatch()"
                >Start</v-btn
              >
              <v-btn 
                @click="STOPWATCH.StopStopwatch()"
                >Stop</v-btn
              >
              <v-btn @click="STOPWATCH.ResetStopwatch()">Reset</v-btn>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useClock, useCountdown, useStopwatch } from "@/store/index.js";

export default {
  setup() {
    const CLOCK = useClock();
    const COUNTDOWN = useCountdown();
    const STOPWATCH = useStopwatch();
    return {
      CLOCK,
      COUNTDOWN,
      STOPWATCH,
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