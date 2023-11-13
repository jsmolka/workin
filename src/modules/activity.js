import { createSchema, date, list, schema } from '../utils/persist';
import { Xml } from '../utils/xml';
import { DataPoint, getAverageCadence, getAverageHeartRate, getAveragePower } from './dataPoint';
import { Workout } from './workout';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.data = [];
  }

  get seconds() {
    return this.data.length;
  }

  get averagePower() {
    return getAveragePower(this.data);
  }

  get averageHeartRate() {
    return getAverageHeartRate(this.data);
  }

  get averageCadence() {
    return getAverageCadence(this.data);
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

            let distance = 0;
            let timestamp = new Date(this.date);
            for (const data of this.laps) {
              xml.element('Lap', `StartTime="${timestamp.toISOString()}"`, () => {
                xml.element('TotalTimeSeconds', data.length);
                xml.element('Track', () => {
                  for (const item of data) {
                    xml.element('Trackpoint', () => {
                      xml.element('Time', timestamp.toISOString());
                      xml.element('DistanceMeters', distance);
                      xml.element('Extensions', () => {
                        xml.element('ns3:TPX', () => {
                          xml.element('ns3:Watts', item.power);
                        });
                      });

                      if (item.heartRate != null) {
                        xml.element('HeartRateBpm', () => {
                          xml.element('Value', item.heartRate);
                        });
                      }

                      if (item.cadence != null) {
                        xml.element('Cadence', item.cadence);
                      }

                      distance += powerToSpeed(item.power);
                      timestamp.setSeconds(timestamp.getSeconds() + 1);
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
  data: list(schema(DataPoint)),
});
