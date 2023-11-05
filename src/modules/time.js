import dayjs from 'dayjs';
import { createSchema, date } from '../utils/persist';

export class Time {
  constructor(hours = 0, minutes = 0, seconds = 0) {
    this.date = new Date();
    this.date.setFullYear(0);
    this.date.setMonth(0);
    this.date.setDate(0);
    this.date.setHours(hours);
    this.date.setMinutes(minutes);
    this.date.setSeconds(seconds);
    this.date.setMilliseconds(0);
  }

  static from(timeish) {
    return new Time(timeish.getHours(), timeish.getMinutes(), timeish.getSeconds());
  }

  clone() {
    return Time.from(this);
  }

  getHours() {
    return this.date.getHours();
  }

  getMinutes() {
    return this.date.getMinutes();
  }

  getSeconds() {
    return this.date.getSeconds();
  }

  setHours(value) {
    return this.date.setHours(value);
  }

  setMinutes(value) {
    return this.date.setMinutes(value);
  }

  setSeconds(value) {
    return this.date.setSeconds(value);
  }

  addHours(value) {
    return this.setHours(this.getHours() + value);
  }

  addMinutes(value) {
    return this.setMinutes(this.getMinutes() + value);
  }

  addSeconds(value) {
    return this.setSeconds(this.getSeconds() + value);
  }

  add(timeish) {
    this.addHours(timeish.getHours());
    this.addMinutes(timeish.getMinutes());
    this.addSeconds(timeish.getSeconds());
    return this;
  }

  subHours(value) {
    return this.addHours(-value);
  }

  subSeconds(value) {
    return this.addSeconds(-value);
  }

  subMinutes(value) {
    return this.addMinutes(-value);
  }

  sub(timeish) {
    this.subHours(timeish.getHours());
    this.subMinutes(timeish.getMinutes());
    this.subSeconds(timeish.getSeconds());
    return this;
  }

  format(template = null) {
    if (template == null) {
      if (this.getHours() >= 10) {
        template = 'HH:mm:ss';
      } else if (this.getHours() >= 1) {
        template = 'H:mm:ss';
      } else if (this.getMinutes() >= 10) {
        template = 'mm:ss';
      } else {
        template = 'm:ss';
      }
    }
    return dayjs(this.date).format(template);
  }

  get isZero() {
    return this.getHours() === 0 && this.getMinutes() === 0 && this.getSeconds() === 0;
  }
}

createSchema(Time, {
  date: date(),
});
