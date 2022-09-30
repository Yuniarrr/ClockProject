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
          <v-card-title
            class="mb-n3 mx-auto d-flex flex-column align-stretch"
            align="center"
            justify="center"
          >
            <v-text-field
              required
              label="Time"
              type="time"
              prepend-icon="mdi-clock"
              class="mb-n3"
              id="alarmTime"
              v-model="ALARM.getTime"
            ></v-text-field>
            <v-text-field
              label="Message"
              type="text"
              prepend-icon="mdi-message-text"
              class="mb-n3"
              v-model="ALARM.message"
            ></v-text-field>
            <input type="hidden" v-model="ALARM.toggle_alarm" />
            <v-select
              :items="ALARM.audio_alarm"
              item-text="name"
              item-value="path"
              value="name"
              label="Select"
              persistent-hint
              return-object
              single-line
              class="mb-n5"
              @change="ALARM.onItemChange($event)"
              prepend-icon="mdi-book-music"
            ></v-select>
            <v-radio-group class="mb-n3" v-model="ALARM.repeat" column label="Repeat">
              <v-radio label="Once" value="once"></v-radio>
              <v-radio label="Everyday" value="everyday"></v-radio>
              <v-radio label="Choose Day" value="day"></v-radio>
              <v-radio label="Choose Date" value="date"></v-radio>
            </v-radio-group>
            <v-text-field
              v-if="ALARM.repeat === 'date'"
              label="Date"
              type="date"
              prepend-icon="mdi-calendar"
              v-model="ALARM.date"
            ></v-text-field>
          </v-card-title>
          <div
            class="d-flex flex-row justify-space-around mb-5 px-5"
            v-if="ALARM.repeat == 'day'"
          >
            <v-icon
              v-for="(icons, index) in ALARM.icon_alarm"
              :key="index"
              size="30"
              @click="icons.change = !icons.change"
              :style="{
                backgroundColor: icons.change ? '' : 'grey',
                color: icons.change ? 'grey' : 'white',
              }"
              >{{ icons.icon }}</v-icon
            >
          </div>
          <div>
            <div class="d-flex flex-row align-center justify-space-around">
              <v-btn class="mb-3" @click="ALARM.AddAlarm()"> Add Alarm </v-btn>
            </div>
            <div
              class="overflow-auto"
              style="
                position: relative;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                  0 6px 20px 0 rgba(0, 0, 0, 0.19);
              "
            >
              <div v-for="(alarm, index) in ALARM.list_alarm" :key="index">
                <v-card class="d-flex flex-column align-stretch pr-4">
                  <v-list>
                    <v-list-item>
                      <v-btn @click="ALARM.DeleteAlarm(index)">
                        <v-icon>mdi-trash-can</v-icon>
                      </v-btn>
                      <v-list-item-title
                        class="hover-overlay align-center d-flex flex-column my-auto"
                        style="cursor: pointer"
                      >
                        <p class="text-body-1 mb-n1">{{ alarm[0] }}</p>
                        <p class="text-body-2">Message: {{ alarm[1] }}</p>
                      </v-list-item-title>
                      <v-list-item-action class="">
                        <v-switch
                          v-model="alarm[3]"
                          @click="
                            alarm[3] ? ALARM.SetAlarm(index) : ALARM.CancelAlarm(index)
                          "
                        ></v-switch>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
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
  data() {
    return {};
  },
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
