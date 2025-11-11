import { DataPoint, DataPoints } from '@/modules/data';
import { Workout } from '@/modules/workout';
import { colors } from '@/utils/colors';
import { array, date, defineSchema, primitive, schema } from '@/utils/persist';
import { powerToSpeed } from '@/utils/speed';
import { xml } from '@/utils/xml';
import { Encoder, Profile, Utils } from '@garmin/fitsdk';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.data = new DataPoints();

    // Calculated once finished
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

  toFit() {
    try {
      const encoder = new Encoder();

      const startTime = Utils.convertDateToDateTime(new Date());

      let timestamp = startTime;

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.FILE_ID,
        type: 'activity',
        manufacturer: 'development',
        product: 0,
        serialNumber: 0,
        timeCreated: startTime,
      });

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.DEVICE_INFO,
        deviceIndex: 'creator',
        manufacturer: 'development',
        product: 1,
        productName: 'workin',
        serialNumber: 0,
        softwareVersion: 0,
        timestamp,
      });

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.EVENT,
        event: 'timer',
        eventType: 'start',
        timestamp,
      });

      let distance = 0;
      for (const dataPoint of [this.data[0], ...this.data]) {
        encoder.writeMesg({
          mesgNum: Profile.MesgNum.RECORD,
          distance,
          heartRate: dataPoint.heartRate,
          cadence: dataPoint.cadence,
          power: dataPoint.power,
          timestamp,
        });
        timestamp++;
        distance += powerToSpeed(dataPoint.power);
      }

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.EVENT,
        event: 'timer',
        eventType: 'stop',
        timestamp,
      });

      timestamp = startTime;
      for (const [i, interval] of this.workout.intervals.entries()) {
        encoder.writeMesg({
          mesgNum: Profile.MesgNum.LAP,
          messageIndex: i,
          startTime: timestamp,
          timestamp: timestamp + interval.seconds,
          totalElapsedTime: interval.seconds, // Elapsed time
          totalTimerTime: interval.seconds, // Moving time
        });
        timestamp += interval.seconds;
      }

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.SESSION,
        startTime,
        timestamp,
        totalElapsedTime: this.data.length,
        totalTimerTime: this.data.length,
        sport: 'cycling',
        subSport: 'indoorCycling',
        firstLapIndex: 0,
        numLaps: this.workout.intervals.length,
      });

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.ACTIVITY,
        timestamp,
        numSessions: 1,
        localTimestamp: timestamp + new Date().getTimezoneOffset() * -60,
        totalTimerTime: this.data.length,
      });

      return encoder.close();
    } catch (error) {
      console.log(error.cause);
      throw error;
    }
  }

  toTcx() {
    const tcx = xml();
    tcx['TrainingCenterDatabase'](
      ['xsi:schemaLocation', 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd'], // prettier-ignore
      ['xmlns:ns5', 'http://www.garmin.com/xmlschemas/ActivityGoals/v1'],
      ['xmlns:ns3', 'http://www.garmin.com/xmlschemas/ActivityExtension/v2'],
      ['xmlns:ns2', 'http://www.garmin.com/xmlschemas/UserProfile/v2'],
      ['xmlns', 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'],
      ['xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'],
      () => {
        tcx['Activities'](() => {
          tcx['Activity'](['Sport', 'Biking'], () => {
            tcx['Id'] = this.date.toISOString();

            let data = [];
            let distance = 0;
            for (const [i, dataPoint] of this.data.entries()) {
              const date = new Date(this.date);
              date.setSeconds(date.getSeconds() + i);
              data.push([date, distance, ...dataPoint]);
              distance += powerToSpeed(dataPoint.power);
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
              tcx['Lap'](['StartTime', lap[0][0].toISOString()], () => {
                tcx['Track'](() => {
                  for (const [date, distance, power, heartRate, cadence] of lap) {
                    tcx['Trackpoint'](() => {
                      tcx['Time'] = date.toISOString();
                      tcx['DistanceMeters'] = distance;
                      tcx['Extensions'](() => {
                        tcx['ns3:TPX'](() => {
                          tcx['ns3:Watts'] = power;
                        });
                      });

                      if (heartRate != null) {
                        tcx['HeartRateBpm'](() => {
                          tcx['Value'] = heartRate;
                        });
                      }

                      if (cadence != null) {
                        tcx['Cadence'] = cadence;
                      }
                    });
                  }
                });
              });
            }

            tcx['Creator'](['xsi:type', 'Application_t'], () => {
              tcx['Name'] = 'workin';
            });
          });
        });
      },
    );
    return tcx.toString();
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
    ctx.fillStyle = colors.shade8.hex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.shade6.hex;
    for (const ry of [25, 50, 75]) {
      ctx.beginPath();
      ctx.moveTo(x(0), y(ry));
      ctx.lineTo(x(100), y(ry));
      ctx.stroke();
    }

    const data = [
      { polylines: this.polylinesHeartRate, style: colors.red.hex },
      { polylines: this.polylinesPower, style: colors.brand3.hex },
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

defineSchema(Activity, {
  date: date(),
  workout: schema(Workout),
  data: array(array(primitive(), DataPoint), DataPoints),
  averagePower: primitive(),
  averageHeartRate: primitive(),
  averageCadence: primitive(),
  polylinesPower: array(array(primitive())),
  polylinesHeartRate: array(array(primitive())),
});
