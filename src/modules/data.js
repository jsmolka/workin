import { math } from '@/utils/math';

export class DataPoint extends Array {
  static IndexPower = 0;
  static IndexHeartRate = 1;
  static IndexCadence = 2;

  constructor(power, heartRate, cadence) {
    super(power, heartRate, cadence);
  }

  get power() {
    return this[DataPoint.IndexPower];
  }

  set power(value) {
    this[DataPoint.IndexPower] = value;
  }

  get heartRate() {
    return this[DataPoint.IndexHeartRate];
  }

  set heartRate(value) {
    this[DataPoint.IndexHeartRate] = value;
  }

  get cadence() {
    return this[DataPoint.IndexCadence];
  }

  set cadence(value) {
    this[DataPoint.IndexCadence] = value;
  }
}

export class DataPoints extends Array {
  /**
   * @private
   */
  average(index) {
    let result = 0;
    let length = 0;
    for (const dataPoint of this) {
      const value = dataPoint[index];
      if (value == null) {
        continue;
      }
      result += value;
      length++;
    }
    return length > 0 ? result / length : null;
  }

  averagePower() {
    return this.average(DataPoint.IndexPower);
  }

  averageHeartRate() {
    return this.average(DataPoint.IndexHeartRate);
  }

  averageCadence() {
    return this.average(DataPoint.IndexCadence);
  }

  /**
   * @private
   */
  polylines(index, minX, maxX, minY, maxY) {
    const p = (value) => 100 * math.clamp(value, 0, 1);
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
    return this.polylines(DataPoint.IndexPower, 0, maxX, 0, maxY);
  }

  polylinesHeartRate(maxX) {
    return this.polylines(DataPoint.IndexHeartRate, 0, maxX, 50, 450);
  }
}
