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

  tcx(powerToVelocity) {
    const now = new Date(this.date);

    const xml = new Xml();
    xml.node('TrainingCenterDatabase', [
      Xml.attribute(
        'xsi:schemaLocation',
        'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
      ),
      Xml.attribute('xmlns:ns5', 'http://www.garmin.com/xmlschemas/ActivityGoals/v1'),
      Xml.attribute('xmlns:ns3', 'http://www.garmin.com/xmlschemas/ActivityExtension/v2'),
      Xml.attribute('xmlns:ns2', 'http://www.garmin.com/xmlschemas/UserProfile/v2'),
      Xml.attribute('xmlns', 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'),
      Xml.attribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'),
    ]);
    xml.node('Activities');
    xml.node('Activity', [Xml.attribute('Sport', 'Biking')]);
    xml.leaf('Id', now.toISOString());

    let meters = 0;
    for (const data of this.laps) {
      xml.node('Lap', [Xml.attribute('StartTime', now.toISOString())]);
      xml.leaf('TotalTimeSeconds', data.length);
      xml.node('Track');

      for (const item of data) {
        xml.node('Trackpoint');
        xml.leaf('Time', now.toISOString());
        xml.leaf('DistanceMeters', meters);

        xml.node('Extensions');
        xml.node('ns3:TPX');
        xml.leaf('ns3:Watts', item.power);
        xml.end();
        xml.end();

        if (item.heartRate != null) {
          xml.node('HeartRateBpm');
          xml.leaf('Value', item.heartRate);
          xml.end();
        }

        if (item.cadence != null) {
          xml.leaf('Cadence', item.cadence);
        }

        xml.end();

        now.setSeconds(now.getSeconds() + 1);
        meters += powerToVelocity(item.power);
      }
      xml.end();
      xml.end();
    }
    xml.end();
    xml.end();
    xml.end();

    return xml.toString();
  }
}

createSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: list(schema(DataPoint)),
});
