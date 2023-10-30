import dayjs from 'dayjs';
import { createSchema, date } from '../utils/persist';

export class Time {
  constructor(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    this.date = new Date();
    this.date.setFullYear(0);
    this.date.setMonth(0);
    this.date.setDate(0);
    this.date.setHours(hours);
    this.date.setMinutes(minutes);
    this.date.setSeconds(seconds);
    this.date.setMilliseconds(milliseconds);
  }

  static from(timeish) {
    return new Time(
      timeish.getHours(),
      timeish.getMinutes(),
      timeish.getSeconds(),
      timeish.getMilliseconds(),
    );
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

  getMilliseconds() {
    return this.date.getMilliseconds();
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

  setMilliseconds(value) {
    return this.date.setMilliseconds(value);
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

  addMilliseconds(value) {
    return this.setMilliseconds(this.getMilliseconds() + value);
  }

  add(timish) {
    this.addHours(timish.getHours());
    this.addMinutes(timish.getMinutes());
    this.addSeconds(timish.getSeconds());
    this.addMilliseconds(timish.getMilliseconds());
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

  subMilliseconds(value) {
    return this.addMilliseconds(-value);
  }

  sub(timish) {
    this.subHours(timish.getHours());
    this.subMinutes(timish.getMinutes());
    this.subSeconds(timish.getSeconds());
    this.subMilliseconds(timish.getMilliseconds());
    return this;
  }

  format(template) {
    return dayjs(this.date).format(template);
  }

  get isZero() {
    return (
      this.getHours() === 0 &&
      this.getMinutes() === 0 &&
      this.getSeconds() === 0 &&
      this.getMilliseconds() === 0
    );
  }
}

createSchema(Time, {
  date: date(),
});
