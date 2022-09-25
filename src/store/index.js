import { defineStore } from "pinia";
import moment from "moment";

export const useClock = defineStore({
  id: "clock",
  state: () => ({
    data: {
      date: "",
      time: "",
      fontSize: 4,
      waktu: ""
    },
    settings: {
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
    },
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
    sound: new Audio(
      "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
    ),
    timer: null,
    display: false,
    alarm: "Set Alarm",
    time_save: 0,
    timeTag: "",
    message: "",
    showMessage: false,
  }),
  actions: {
    AlarmDisplay() {
      return (this.display = !this.display);
    },
    SetAlarm() {
      let ms =
        new Date().setHours(0, 0, 0, 0) +
        this.time_save.slice(0, 2) * 3600000 +
        this.time_save.slice(3, 5) * 60000;
      if (isNaN(ms)) {
        alert("You've got to give me something to work with here, friend.");
        return;
      }
      let alarm = new Date(ms);
      var dt = new Date().getTime();
      let differenceInMs = alarm.getTime() - dt;

      if (differenceInMs < 0) {
        alert(
          "It looks like that's a date from the past! Are you a time traveler?!"
        );
        return;
      }
      this.timer = setTimeout(() => {
        this.InitAlarm();
      }, differenceInMs);
      this.display = true;
      this.alarm = "Cancel Alarm";
    },
    CancelAlarm() {
      clearTimeout(this.timer);
      this.alarm = "Set Alarm";
      this.display = false;
    },
    InitAlarm() {
      this.sound.play();
      this.sound.loop = true;
      this.showMessage = true;
    },
    StopAlarm() {
      const CLOCK = useClock();
      this.sound.pause();
      this.sound.loop = false;
      this.sound.currentTime = 0;
      this.display = false;
      this.alarm = "Set Alarm";
      this.showMessage = false;
      CLOCK.settings.show_alarm = false;
    },
    SnoozeAlarm() {
      this.sound.loop = false;
      this.sound.pause();
      this.sound.currentTime = 0;
      this.timer = setTimeout(() => {
        this.InitAlarm();
      }, 5000);
    },
  },
});
