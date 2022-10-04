import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import moment from "moment";
import ringtone_1 from "../assets/ringtone_1.mp3";
import ringtone_2 from "../assets/ringtone_2.mp3";
import ringtone_3 from "../assets/ringtone_3.mp3";
import ringtone_4 from "../assets/ringtone_4.mp3";
import ringtone_5 from "../assets/ringtone_5.mp3";

export const useClock = defineStore({
  id: "clock",
  state: () => ({
    data: {
      date: "",
      time: "",
      fontSize: 4,
      waktu: "",
    },
    settings: useStorage("settings", {
      show_settings: false,
      font_size: "medium",
      clock_style: "digital",
      time_format: "1",
      date_format: "satu",
      show_alarm: false,
      date_format: "satu",
      img: "use",
      show_countdown: false,
      show_stopwatch: false,
      color: "black",
      day: "yes",
    }),
  }),
  getters: {},
  actions: {
    CurrentDate() {
      let day = moment().day();
      switch (day) {
        case 0:
          day = "Minggu";
          break;
        case 1:
          day = "Senin";
          break;
        case 2:
          day = "Selasa";
          break;
        case 3:
          day = "Rabu";
          break;
        case 4:
          day = "Kamis";
          break;
        case 5:
          day = "Jumat";
          break;
        case 6:
          day = "Sabtu";
          break;
        default:
          day = "Hari";
          break;
      }
      const SETTINGS = this.settings;
      if (SETTINGS.day == "yes") {
        if (SETTINGS.date_format == "satu") {
          return day + moment().format(`, D MMMM YYYY`);
        } else if (SETTINGS.date_format == "dua") {
          return day + moment().format(`, MMMM D YYYY`);
        } else if (SETTINGS.date_format == "tiga") {
          return day + moment().format(`, YYYY MMMM D`);
        }
      } else {
        if (SETTINGS.date_format == "satu") {
          return moment().format(`D MMMM YYYY`);
        } else if (SETTINGS.date_format == "dua") {
          return moment().format(`MMMM D YYYY`);
        } else if (SETTINGS.date_format == "tiga") {
          return moment().format(`YYYY MMMM D`);
        }
      }
    },
    CurrentTime() {
      if (this.settings.time_format == "1") {
        return moment().format("h:mm:ss a");
      } else {
        return moment().format("HH:mm:ss");
      }
    },
    Time() {
      return moment().format("a");
    },
    ChangeFontSize() {
      switch (this.settings.font_size) {
        case "small":
          this.settings.font_size = "small";
          break;

        case "medium":
          this.settings.font_size = "medium";
          break;

        case "large":
          this.settings.font_size = "large";
          break;

        default:
          this.settings.font_size = "medium";
          break;
      }
    },
    ToggleSettings() {
      return (this.settings.show_settings = !this.settings.show_settings);
    },
    ShowAlarms() {
      return (this.settings.show_alarm = !this.settings.show_alarm);
    },
    ShowCountdown() {
      return (this.settings.show_countdown = !this.settings.show_countdown);
    },
    ShowStopwatch() {
      return (this.settings.show_stopwatch = !this.settings.show_stopwatch);
    },
    ChangeTimeFormat() {
      switch (this.settings.time_format) {
        case "1":
          this.settings.time_format = "1";
          break;

        case "2":
          this.settings.time_format = "2";
          break;

        default:
          this.settings.time_format = "1";
          break;
      }
    },
    ChangeDateFormat() {
      switch (this.settings.date_format) {
        case "satu":
          this.settings.date_format = "satu";
          break;

        case "dua":
          this.settings.date_format = "dua";
          break;

        case "tiga":
          this.settings.date_format = "tiga";
          break;

        default:
          break;
      }
    },
    ChangeFontSize() {
      switch (this.settings.font_size) {
        case "small":
          this.data.fontSize = 2;
          break;

        case "medium":
          this.data.fontSize = 4;
          break;

        case "large":
          this.data.fontSize = 6;
          break;

        default:
          this.settings.font_size = 4;
          break;
      }
    },
  },
});

export const useCountdown = defineStore({
  id: "countdown",
  state: () => ({
    data: {
      selectedTime: 0,
      timeLeft: "00:00",
      endTime: "0",
      times: [
        {
          sec: 3,
          display: "3s",
        },
        {
          sec: 600,
          display: "10m",
        },
        {
          sec: 1500,
          display: "25m",
        },
      ],
    },
    intervalTimer: null,
    sound: new Audio(
      "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
    ),
    showMessage: false,
  }),
  getters: {},
  actions: {
    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.data.selectedTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      let that = this;
      if (this.endTime != 0 || this.selectedTime != 0) {
        that.intervalTimer = setInterval(() => {
          const secondsLeft = Math.round((end - Date.now()) / 1000);

          if (secondsLeft === 0) {
            that.data.endTime = 0;
          }

          if (secondsLeft < 0) {
            clearInterval(that.intervalTimer);
            return;
          }
          that.displayTimeLeft(secondsLeft);
          useStorage("countdown", secondsLeft);
        }, 1000);
        setTimeout(() => {
          that.initSound();
          this.showMessage = true;
        }, this.data.selectedTime * 1000);
      }
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;
      let zeroM = this.zeroPadded(minutes);
      let zeroS = this.zeroPadded(seconds);
      this.data.timeLeft = `${zeroM}:${zeroS}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();
      let hourH = this.hourConvert(hour);
      let zeroM = this.zeroPadded(minutes);
      this.data.endTime = `${hourH}:${zeroM}`;
    },
    zeroPadded(num) {
      return num < 10 ? `0${num}` : num;
    },
    hourConvert(hour) {
      return hour % 12 || 12;
    },
    initSound() {
      this.sound.play();
      this.sound.loop = true;
    },
    stopCountDown() {
      const CLOCK = useClock();
      clearInterval(this.intervalTimer);
      this.data.timeLeft = "00:00";
      this.data.endTime = 0;
      this.data.selectedTime = 0;
      this.sound.pause();
      this.sound.loop = false;
      this.showMessage = false;
      CLOCK.settings.show_countdown = false;
    },
  },
});

export const useStopwatch = defineStore({
  id: "stopwatch",
  state: () => ({
    time: "00:00:00.000",
    time_began: null,
    time_stopped: null,
    stopped_duration: 0,
    started: null,
    running: false,
    rounds: [],
  }),
  actions: {
    StartStopwatch() {
      let that = this;
      if (that.running) return;

      if (that.time_began === null) {
        that.ResetStopwatch();
        that.time_began = new Date();
      }

      if (that.time_stopped !== null) {
        that.stopped_duration += new Date() - that.time_stopped;
      }

      that.started = setInterval(that.ClockRunning, 10);
      that.running = true;
    },
    StopStopwatch() {
      this.running = false;
      this.time_stopped = new Date();
      clearInterval(this.started);
    },
    ResetStopwatch() {
      this.running = false;
      clearInterval(this.started);
      this.stopped_duration = 0;
      this.time_began = null;
      this.time_stopped = null;
      this.time = "00:00:00.000";
      this.rounds = [];
    },
    ClockRunning() {
      let current_time = new Date();
      let time_elapsed = new Date(
        current_time - this.time_began - this.stopped_duration
      );
      let hour = time_elapsed.getUTCHours();
      let min = time_elapsed.getUTCMinutes();
      let sec = time_elapsed.getUTCSeconds();
      let ms = time_elapsed.getUTCMilliseconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },
    zeroPrefix(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    RoundStopwatch() {
      this.rounds.push(this.time);
    },
  },
});

export const useAlarm = defineStore({
  id: "alarm",
  state: () => ({
    sound: new Audio(),
    timer: null,
    display: false,
    timeTag: "",
    showMessage: false,
    repeat: "once",
    difference_time: 0,
    list_alarm: useStorage("alarm", []),
    getTime: "",
    index: 9999,
    date: "",
    message: "",
    selected_audio: "",
    toggle_alarm: false,
    audio_alarm: [
      {
        name: "Ringtone 1",
        path: new Audio(
          "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
        ),
      },
      {
        name: "Ringtone 2",
        path: new Audio(ringtone_1),
      },
      {
        name: "Ringtone 3",
        path: new Audio(ringtone_2),
      },
      {
        name: "Ringtone 4",
        path: new Audio(ringtone_3),
      },
      {
        name: "Ringtone 5",
        path: new Audio(ringtone_4),
      },
      {
        name: "Ringtone 6",
        path: new Audio(ringtone_5),
      },
    ],
    icon_alarm: [
      {
        change: false,
        icon: "mdi-alpha-s-box",
        value: "Senin",
      },
      {
        change: false,
        icon: "mdi-alpha-s-box",
        value: "Selasa",
      },
      {
        change: false,
        icon: "mdi-alpha-r-box",
        value: "Rabu",
      },
      {
        change: false,
        icon: "mdi-alpha-k-box",
        value: "Kamis",
      },
      {
        change: false,
        icon: "mdi-alpha-j-box",
        value: "Jumat",
      },
      {
        change: false,
        icon: "mdi-alpha-s-box",
        value: "Sabtu",
      },
      {
        change: false,
        icon: "mdi-alpha-m-box",
        value: "Minggu",
      },
    ],
    snooze_diff: 0,
  }),
  actions: {
    AlarmDisplay() {
      return (this.display = !this.display);
    },
    DeleteAlarm(index) {
      this.list_alarm.splice(index, 1);
    },
    onItemChange(e) {
      this.selected_audio = e.path.currentSrc;
    },
    AddAlarm() {
      if (this.getTime !== 0 && this.message !== "") {
        let list_day = [];
        for (let index = 0; index < this.icon_alarm.length; index++) {
          if (this.icon_alarm[index].change) {
            list_day.push(this.icon_alarm[index].value);
          }
        }
        const popup = false;
        let repeat = this.repeat;
        const LIST_ALARM = [
          this.getTime,
          this.message,
          this.selected_audio,
          this.toggle_alarm,
          list_day,
          this.date,
          popup,
          repeat,
        ];
        this.list_alarm.push(LIST_ALARM);
      } else {
        this.showMessage = true;
        this.message = "Input the time and message";
        setTimeout(() => {
          this.message = "";
          this.showMessage = false;
        }, 1000);
      }
    },
    CheckDay(index) {
      let day = moment().day();
      switch (day) {
        case 0:
          day = "Minggu";
          break;
        case 1:
          day = "Senin";
          break;
        case 2:
          day = "Selasa";
          break;
        case 3:
          day = "Rabu";
          break;
        case 4:
          day = "Kamis";
          break;
        case 5:
          day = "Jumat";
          break;
        case 6:
          day = "Sabtu";
          break;
        default:
          day = "Hari";
          break;
      }
      for (let i = 0; i < this.list_alarm[index][4].length; i++) {
        if (day === this.list_alarm[index][4][i]) {
          return true;
        }
      }
      return false;
    },
    SetAlarm(index) {
      if (this.list_alarm[index][3]) {
        const REPEAT = this.list_alarm[index][7];
        const MSG = this.list_alarm[index][1];
        if (REPEAT === "once") {
          this.SetAlarmTime(index);
          this.timer = setTimeout(() => {
            if (MSG) {
              this.message = MSG;
            } else {
              this.message = "Alarm";
            }
            this.InitAlarm(index);
            this.list_alarm[index][3] = false;
            this.showMessage = true;
            this.index = index;
          }, this.difference_time);
        } else if (REPEAT === "everyday") {
          this.SetAlarmTime(index);
          this.timer = setTimeout(() => {
            if (MSG) {
              this.message = MSG;
            } else {
              this.message = "Alarm";
            }
            this.InitAlarm(index);
            this.showMessage = true;
            this.index = index;
          }, this.difference_time);
        } else if (REPEAT === "day") {
          if (this.CheckDay(index)) {
            this.SetAlarmTime(index);
            this.timer = setTimeout(() => {
              if (MSG) {
                this.message = MSG;
              } else {
                this.message = "Alarm";
              }
              this.InitAlarm(index);
              this.showMessage = true;
              this.index = index;
            }, this.difference_time);
          }
        } else if (REPEAT === "date") {
          let date = new Date();
          let getDay = date.getDate();
          let day = getDay < 10 ? "0" + getDay : getDay;
          let getMonth = date.getMonth() + 1;
          let month = getMonth < 10 ? "0" + getMonth : getMonth;
          let year = date.getFullYear();
          let local_date = `${year}-${month}-${day}`;
          if (this.list_alarm[index][5] === local_date) {
            this.SetAlarmTime(index);
            this.timer = setTimeout(() => {
              if (MSG) {
                this.message = MSG;
              } else {
                this.message = "Alarm";
              }
              this.InitAlarm(index);
              this.showMessage = true;
              this.index = index;
            }, this.difference_time);
          }
        }
      }
    },
    SetAlarmTime(index) {
      let ms =
        new Date().setHours(0, 0, 0, 0) +
        this.list_alarm[index][0].slice(0, 2) * 3600000 +
        this.list_alarm[index][0].slice(3, 5) * 60000;
      if (isNaN(ms)) {
        alert("You've got to give me something to work with here, friend.");
        return;
      }
      let alarm = moment(new Date(ms));
      let dt = moment(new Date().getTime()).valueOf();
      this.difference_time = alarm.valueOf() - dt;

      if (this.difference_time < 0) {
        let new_dt = moment().add(1, "d").valueOf();
        this.difference_time = new_dt - alarm.valueOf();
      }
      this.display = true;
    },
    OnAlarm() {
      this.showMessage = true;
      this.message = "alarm has been set";
      setTimeout(() => {
        this.message = "";
        this.showMessage = false;
      }, 700);
    },
    CancelAlarm(index) {
      clearTimeout(this.timer);
      this.display = false;
      this.list_alarm[index][3] = false;
    },
    InitAlarm(index) {
      if (this.list_alarm[index][2]) {
        this.sound.src = this.list_alarm[index][2];
      } else {
        this.sound.src = ringtone_1;
      }
      this.sound.loop = true;
      this.sound.muted = false;
      this.sound.play();
    },
    StopAlarm(index) {
      this.list_alarm[index][6] = false;
      const CLOCK = useClock();
      this.sound.pause();
      this.message = "";
      this.getTime = "";
      this.sound.loop = false;
      this.sound.currentTime = 0;
      this.display = false;
      this.showMessage = false;
      this.repeat = "once";
      CLOCK.settings.show_alarm = false;
    },
    SnoozeAlarm(index) {
      let input_time = this.list_alarm[index][0];
      input_time = moment().add(10, "s").format("HH:mm:ss").valueOf();
      let next_time =
        new Date().setHours(0, 0, 0, 0) +
        input_time.slice(0, 2) * 3600000 +
        input_time.slice(3, 5) * 60000 +
        input_time.slice(6, 8) * 1000;
      let next = moment(new Date(next_time).getTime()).valueOf();
      let now = moment(new Date().getTime());
      this.snooze_diff = next - now;
      useStorage("snooze", this.snooze_diff);
      this.showMessage = false;
      this.sound.loop = false;
      this.sound.pause();
      this.sound.currentTime = 0;
      this.timer = setTimeout(() => {
        this.sound.play();
        this.sound.loop = true;
        this.showMessage = true;
      }, this.snooze_diff);
    },
    DateFormat(item) {
      let date = item;
      let day = date.slice(8, 10);
      let month = date.slice(5, 7);
      let year = date.slice(0, 4);
      switch (month) {
        case "01":
          month = "Jan";
          break;

        case "02":
          month = "Feb";
          break;

        case "03":
          month = "Mar";
          break;

        case "04":
          month = "Apr";
          break;

        case "05":
          month = "May";
          break;

        case "06":
          month = "Jun";
          break;

        case "07":
          month = "Jul";
          break;

        case "08":
          month = "Aug";
          break;

        case "09":
          month = "Sep";
          break;

        case "10":
          month = "Oct";
          break;

        case "11":
          month = "Nov";
          break;

        case "12":
          month = "Dec";
          break;

        default:
          month = "Month";
          break;
      }
      return `${day} ${month} ${year}`;
    },
  },
});
