import dayjs from 'dayjs';
import { Time } from '../modules/time';

export function useFormat() {
  return {
    formatNumber: (number) => (number != null ? Math.round(number) : '-'),
    formatSeconds: (seconds) => new Time(0, 0, seconds).format(),
    formatDate: (date, template) => dayjs(date).format(template),
  };
}
