import Component, { tracked } from '@glimmer/component';

export default class CountdownComponent extends Component {
  @tracked countdownTime;
  @tracked countdownDays;
  @tracked countdownMonths;
  @tracked theme;

  constructor(options) {
    super(options);
    this.loadTime();
    this.theme = 'dark';
  }

  loadTime() {
    let now = +new Date();
    let expireDate = +new Date('2017-12-31T23:59:59');
    let diffSeconds = (expireDate - now) / 1000
    let months = Math.floor((diffSeconds / 86400) / 30.4167);
    let monthsInSeconds = months * 2592000;
    let days = Math.floor((diffSeconds - monthsInSeconds) / 86400);

    this.countdownTime = this.secondsToTime(diffSeconds);
    this.countdownDays = days;
    this.countdownMonths = months;
    setTimeout(() => this.loadTime(), 1000);
  }

  // Methods
  secondsToTime(sec) {
    let hours = Math.floor((sec % 86400) / 3600).toString();
    let minutes = Math.floor(((sec % 86400) % 3600) / 60).toString();
    let seconds = Math.floor(((sec % 86400) % 3600) % 60).toString();
    let time = { hours, minutes, seconds };
    for (let key in time) {
      if (time[key].length === 1) {
        time[key] = ['dig-0', `dig-${time[key]}`];
      } else {
        time[key] = [`dig-${time[key][0]}`, `dig-${time[key][1]}`];
      }
    }
    return time;
  }

  // actions
  toggleTheme(e) {
    e.preventDefault();
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
};
