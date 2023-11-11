import dayjs from 'dayjs';

export function useFormat() {
  const formatDate = (date, template) => {
    return dayjs(date).format(template);
  };

  const formatSeconds = (seconds) => {
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
  };

  return {
    formatDate,
    formatSeconds,
  };
}
