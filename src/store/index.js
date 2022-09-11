import { defineStore } from "pinia";
import moment from "moment";

export const useClock = defineStore({
	id: "clock",
	state: () => ({
		data: {
			date: "",
			time: "",
		},
		settings: {
			show_settings: false,
			font_size: "medium",
			clock_style: "digital",
			show_alarm: false,
			show_countdown: false,
			show_stopwatch: false,
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
			return day + moment().format(", D MMMM YYYY");
		},
		CurrentTime() {
			return moment().format("h:mm:ss");
		},
		ChangeFontSize() {
			// console.log(this.settings.font_size);
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
		ChangeClockStyle() {
			console.log(this.settings.clock_style);
		},
		ToggleSettings() {
			return (this.settings.show_settings = !this.settings.show_settings);
		},
		ShowAlarms() {
			console.log(this.settings.show_alarm);
			return (this.settings.show_alarm = !this.settings.show_alarm);
		},
		ShowCountdown() {
			return (this.settings.show_countdown = !this.settings.show_countdown);
		},
		ShowStopwatch() {
			return (this.settings.show_stopwatch = !this.settings.show_stopwatch);
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
					sec: 1800,
					display: "30m",
				},
			],
		},
		intervalTimer: null,
	}),
	getters: {},
	actions: {
		setTime(seconds) {
			// var intervalTimer;
			clearInterval(this.intervalTimer);
			this.timer(seconds);
		},
		timer(seconds) {
			const now = Date.now();
			const end = now + seconds * 1000;
			this.displayTimeLeft(seconds);

			this.data.selectedTime = seconds;
			// this.initialTime = seconds;
			this.displayEndTime(end);
			this.countdown(end);
		},
		countdown(end) {
			// this.initialTime = this.selectedTime;
			let that = this;
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
			// 4 --> 04
			return num < 10 ? `0${num}` : num;
		},
		hourConvert(hour) {
			// 15 --> 3
			return hour % 12 || 12;
		},
	},
});

export const useStopwatch = defineStore({
	id: 'stopwatch',
	state: () => ({}),
	actions: {}
})