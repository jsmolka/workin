import { createSchema, nullable, primitive } from '../utils/persist';

export class DataPoint {
  constructor(power = 0, cadence = null, heartRate = null) {
    this.power = power;
    this.cadence = cadence;
    this.heartRate = heartRate;
  }
}

createSchema(DataPoint, {
  power: primitive(),
  cadence: nullable(primitive()),
  heartRate: nullable(primitive()),
});

function getAverage(data, property) {
  let result = null;
  let length = 0;
  for (const item of data) {
    const value = item[property];
    if (value != null) {
      result ??= 0;
      result += value;
      length++;
    }
  }
  return result != null ? result / length : null;
}

export function getAveragePower(data) {
  return getAverage(data, 'power');
}

export function getAverageHeartRate(data) {
  return getAverage(data, 'heartRate');
}

export function getAverageCadence(data) {
  return getAverage(data, 'cadence');
}
