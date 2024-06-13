import { Workout } from '@/modules/workout';
import { array, createSchema, date, primitive, schema } from '@/utils/persist';
import { Xml } from '@/utils/xml';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.data = [];
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

  tcx(powerToSpeed) {
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
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: array(array(primitive())),
  averagePower: primitive(),
  averageHeartRate: primitive(),
  averageCadence: primitive(),
  polylinesPower: array(array(primitive())),
  polylinesHeartRate: array(array(primitive())),
});
