import dayjs from 'dayjs';

export function formatDate(date, template) {
  return dayjs(date).format(template);
}

export function formatSeconds(seconds) {
  const date = new Date(0, 0, 0, 0, 0, seconds);

  let template;
  if (date.getHours() >= 10) {
    template = 'HH:mm:ss';
  } else if (date.getHours() >= 1) {
    template = 'H:mm:ss';
  } else if (date.getMinutes() >= 10) {
    template = 'mm:ss';
  } else {
    template = 'm:ss';
  }
  return formatDate(date, template);
}

export function parseSeconds(string) {
  const units = string.split(':');
  if (units.length <= 1) {
    return null;
  }

  units.reverse();

  let seconds = 0;
  if (units.length > 0) {
    const value = parseInt(units[0]);
    if (isNaN(value) || value < 0 || value >= 60) {
      return null;
    }
    seconds += value;
  }
  if (units.length > 1) {
    const value = parseInt(units[1]);
    if (isNaN(value) || value < 0 || value >= 60) {
      return null;
    }
    seconds += value * 60;
  }
  if (units.length > 2) {
    const value = parseInt(units[2]);
    if (isNaN(value) || value < 0 || value >= 24) {
      return null;
    }
    seconds += value * 60 * 60;
  }
  return seconds;
}
