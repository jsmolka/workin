import { math } from '../utils/math';

function getAverage(data, index) {
  let result = 0;
  let length = 0;
  for (const item of data) {
    const value = item[index];
    if (value != null) {
      result += value;
      length++;
    }
  }
  return length > 0 ? result / length : null;
}

export function getAveragePower(data) {
  return getAverage(data, 0);
}

export function getAverageHeartRate(data) {
  return getAverage(data, 1);
}

export function getAverageCadence(data) {
  return getAverage(data, 2);
}

const percent = (value) => 100 * math.clamp(value, 0, 1);

export function polylines(data, index, maxX, maxY) {
  let result = [];
  let points = [];
  for (let i = 0; i < data.length; i++) {
    const value = data[i]?.[index];
    if (value != null) {
      points.push(percent(i / (maxX - 1)));
      points.push(percent(value / maxY));

      let j = i + 1;
      for (; j < data.length; j++) {
        const nextValue = data[j]?.[index];
        if (nextValue !== value) {
          break;
        }
      }

      if (j !== i + 1) {
        points.push(percent(j / (maxX - 1)));
        points.push(percent(value / maxY));
        i = j;
      }
    }

    if ((value == null || i >= data.length - 1) && points.length > 0) {
      result.push(points);
      points = [];
    }
  }
  return result;
}

export function polylinesPower(data, maxX, maxY) {
  return polylines(data, 0, maxX, maxY);
}

export function polylinesHeartRate(data, maxX, maxY) {
  return polylines(data, 1, maxX, maxY);
}
