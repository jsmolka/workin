import { clamp } from '@/utils/numeric';
import { defineSchema, nullable, primitive } from '@/utils/persist';

export class Record {
  constructor(power, heartRate, cadence) {
    this.power = power;
    this.heartRate = heartRate;
    this.cadence = cadence;
  }
}

defineSchema(Record, {
  power: primitive(),
  heartRate: nullable(primitive()),
  cadence: nullable(primitive()),
});

export class Records extends Array {
  average(prop) {
    let result = 0;
    let length = 0;
    for (const record of this) {
      const value = record[prop];
      if (value == null) {
        continue;
      }
      result += value;
      length++;
    }
    return length > 0 ? result / length : null;
  }

  averagePower() {
    return this.average('power');
  }

  averageHeartRate() {
    return this.average('heartRate');
  }

  averageCadence() {
    return this.average('cadence');
  }

  polylines(index, minX, maxX, minY, maxY) {
    const p = (value) => 100 * clamp(value, 0, 1);
    const x = (value) => p((value - minX) / (maxX - minX - 1));
    const y = (value) => p((value - minY) / (maxY - minY));

    let result = [];
    let points = [];
    for (let i = 0; i < this.length; i++) {
      const value = this[i]?.[index];
      if (value != null) {
        points.push(x(i));
        points.push(y(value));

        let j = i;
        for (; j < this.length; j++) {
          const next = this[j + 1]?.[index];
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

      if ((value == null || i === this.length - 1) && points.length > 0) {
        result.push(points);
        points = [];
      }
    }
    return result;
  }

  polylinesPower(maxX, maxY) {
    return this.polylines('power', 0, maxX, 0, maxY);
  }

  polylinesHeartRate(maxX) {
    return this.polylines('heartRate', 0, maxX, 50, 450);
  }
}
