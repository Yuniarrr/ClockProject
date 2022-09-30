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
          <v-card-actions>
            <v-btn color="primary" text @click="ALARM.StopAlarm()"> Close </v-btn>
            <!-- <v-btn color="primary" text @click="ALARM.SnoozeAlarm()"> Snooze </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="COUNTDOWN.showMessage" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Alarm</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-h6">TIME'S UP</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="COUNTDOWN.stopCountDown()"> Close </v-btn>
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
  methods: {
    findIndexBasedOnListAlarm() {
      let index = 0;
      let arr_list = [];
      for (let i = 0; i < this.ALARM.list_alarm.length; i++) {
        if (this.ALARM.list_alarm[i][3]) {
          arr_list.push([this.ALARM.list_alarm[i]]);
        }
      }
      // console.log(arr_list);
      // console.log(new_arr);
      let x = 0;
      if (arr_list.length > 1) {
        for (let i = 0; i < arr_list.length; i++) {
          console.log(arr_list[i][0][0]);
          console.log(arr_list[i][0][0] < arr_list[i + 1][0][0]);
          if (arr_list[i][0][0] < arr_list[i + 1][0][0]) {
            index = i;
          } else {
            index = i + 1;
          }
          // if (arr_list[i][0][0] > arr_list[i + 1][0][0]) {
          //   index = i;
          //   break;
          // }
        }
      } else {
        index = 0;
      }
      console.log(index);
      return index;
    },
    getTheBigValue(val1, val2) {
      if (val1 > val2) {
        return val1;
      } else {
        return val2;
      }
    },
  },
};
</script>
