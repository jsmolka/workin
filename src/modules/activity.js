import { DataPoint, DataPoints } from '@/modules/data';
import { Workout } from '@/modules/workout';
import { array, createSchema, date, primitive, schema } from '@/utils/persist';
import { Xml } from '@/utils/xml';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.data = new DataPoints();
    this.averagePower = 0;
    this.averageHeartRate = null;
    this.averageCadence = null;
    this.polylinesPower = [];
    this.polylinesHeartRate = [];
  }

  get seconds() {
    return this.data.length;
  }

  get calories() {
    return 3.6 * this.averagePower * (this.seconds / 3600);
  }

  get laps() {
    const result = [];

    let totalSeconds = 0;
    for (const { seconds } of this.workout.intervals) {
      const data = this.data.slice(totalSeconds, totalSeconds + seconds);
      if (data.length === 0) {
        break;
      }
      result.push(data);
      totalSeconds += seconds;
    }
    return result;
  }

  toTcx(powerToSpeed) {
    const xml = new Xml();
    xml.element(
      'TrainingCenterDatabase',
      'xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd"',
      'xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1"',
      'xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2"',
      'xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2"',
      'xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2"',
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
      () => {
        xml.element('Activities', () => {
          xml.element('Activity', 'Sport="Biking"', () => {
            xml.element('Id', this.date.toISOString());

            let data = [];
            let distance = 0;
            for (const [i, item] of this.data.entries()) {
              const date = new Date(this.date);
              date.setSeconds(date.getSeconds() + i);
              data.push([date, distance, ...item]);
              distance += powerToSpeed(item[0]);
            }

            const last = structuredClone(data.at(-1));
            last[0].setSeconds(last[0].getSeconds() + 1);
            data.push(last);

            let laps = [];
            let totalSeconds = 0;
            for (const { seconds } of this.workout.intervals) {
              const lap = data.slice(totalSeconds, totalSeconds + seconds + 1);
              if (lap.length === 0) {
                break;
              }
              laps.push(lap);
              totalSeconds += seconds;
            }

            for (const lap of laps) {
              xml.element('Lap', `StartTime="${lap[0][0].toISOString()}"`, () => {
                xml.element('Track', () => {
                  for (const [date, distance, power, heartRate, cadence] of lap) {
                    xml.element('Trackpoint', () => {
                      xml.element('Time', date.toISOString());
                      xml.element('DistanceMeters', distance);
                      xml.element('Extensions', () => {
                        xml.element('ns3:TPX', () => {
                          xml.element('ns3:Watts', power);
                        });
                      });

                      if (heartRate != null) {
                        xml.element('HeartRateBpm', () => {
                          xml.element('Value', heartRate);
                        });
                      }

                      if (cadence != null) {
                        xml.element('Cadence', cadence);
                      }
                    });
                  }
                });
              });
            }
          });
        });
      },
    );
    return xml.toString();
  }

  toCanvas() {
    const w = 1000;
    const h = 0.4 * w;
    const x = (value) => (value / 100) * w;
    const y = (value) => (1 - value / 100) * h;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#242933';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#363e4d';
    for (const ry of [25, 50, 75]) {
      ctx.beginPath();
      ctx.moveTo(x(0), y(ry));
      ctx.lineTo(x(100), y(ry));
      ctx.stroke();
    }

    const data = [
      { polylines: this.polylinesHeartRate, style: '#be6069' },
      { polylines: this.polylinesPower, style: '#608fb3' },
    ];
    for (const { polylines, style } of data) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = style;
      for (const polyline of polylines) {
        ctx.beginPath();
        for (let i = 0; i < polyline.length; i += 2) {
          const rx = polyline[i];
          const ry = polyline[i + 1];
          if (i === 0) {
            ctx.moveTo(x(rx), y(ry));
          } else {
            ctx.lineTo(x(rx), y(ry));
          }
        }
        ctx.stroke();
      }
    }
    return canvas;
  }
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: array(array(primitive(), DataPoint), DataPoints),
  averagePower: primitive(),
  averageHeartRate: primitive(),
  averageCadence: primitive(),
  polylinesPower: array(array(primitive())),
  polylinesHeartRate: array(array(primitive())),
});
