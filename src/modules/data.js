import { math } from '../utils/math';

function average(data, index) {
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

export function averagePower(data) {
  return average(data, 0);
}

export function averageHeartRate(data) {
  return average(data, 1);
}

export function averageCadence(data) {
  return average(data, 2);
}

function polylines(data, index, minX, maxX, minY, maxY) {
  const p = (value) => 100 * math.clamp(value, 0, 1);
  const x = (value) => p((value - minX) / (maxX - minX - 1));
  const y = (value) => p((value - minY) / (maxY - minY));

  let result = [];
  let points = [];
  for (let i = 0; i < data.length; i++) {
    const value = data[i]?.[index];
    if (value != null) {
      points.push(x(i));
      points.push(y(value));

      let j = i;
      for (; j < data.length; j++) {
        const next = data[j + 1]?.[index];
        if (value !== next) {
          break;
        }
      }

      if (i !== j) {
        points.push(x(j));
        points.push(y(value));
        i = j;
      }
    }

    if ((value == null || i === data.length - 1) && points.length > 0) {
      result.push(points);
      points = [];
    }
  }
  return result;
}

export function polylinesPower(data, maxX, maxY) {
  return polylines(data, 0, 0, maxX, 0, maxY);
}

export function polylinesHeartRate(data, maxX) {
  return polylines(data, 1, 0, maxX, 50, 450);
}
