import { Record, Records } from '@/modules/record';
import { Workout } from '@/modules/workout';
import { colors } from '@/utils/colors';
import { array, date, defineSchema, primitive, schema } from '@/utils/persist';
import { powerToSpeed } from '@/utils/speed';
import { Encoder, Profile, Utils } from '@garmin/fitsdk';

export class Activity {
  constructor(workout = new Workout()) {
    this.date = new Date();
    this.workout = workout;
    this.records = new Records();

    // Set on finish
    this.ftp = 0;
    this.averagePower = 0;
    this.averageHeartRate = null;
    this.averageCadence = null;
    this.polylinesPower = [];
    this.polylinesHeartRate = [];
  }

  get seconds() {
    return this.records.length;
  }

  get calories() {
    return 3.6 * this.averagePower * (this.seconds / 3600);
  }

  get laps() {
    const result = [];

    let totalSeconds = 0;
    for (const { seconds } of this.workout.intervals) {
      const lap = this.records.slice(totalSeconds, totalSeconds + seconds);
      if (lap.length === 0) {
        break;
      }
      result.push(lap);
      totalSeconds += seconds;
    }
    return result;
  }

  finish(ftp) {
    this.ftp = ftp;
    this.averagePower = this.records.averagePower();
    this.averageHeartRate = this.records.averageHeartRate();
    this.averageCadence = this.records.averageCadence();
    this.polylinesPower = this.records.polylinesPower(2 * ftp);
    this.polylinesHeartRate = this.records.polylinesHeartRate();
  }

  toFit() {
    let startTime = Utils.convertDateToDateTime(this.date);
    let timestamp = startTime;

    const encoder = new Encoder();
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
      product: 0,
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
    const laps = this.laps;
    for (const [i, lap] of laps.entries()) {
      // Duplicate the first record of the first lap. Strava calculates moving
      // time based on the interval between consecutive points, so we need at
      // least two points to produce one second of moving time.
      const records = i === 0 ? [lap[0], ...lap] : lap;
      for (const record of records) {
        const speed = powerToSpeed(record.power);
        encoder.writeMesg({
          mesgNum: Profile.MesgNum.RECORD,
          power: record.power,
          heartRate: record.heartRate,
          cadence: record.cadence,
          speed,
          distance,
          timestamp,
        });
        distance += speed;
        timestamp++;
      }

      encoder.writeMesg({
        mesgNum: Profile.MesgNum.LAP,
        messageIndex: i,
        startTime: timestamp - records.length,
        timestamp,
        totalElapsedTime: lap.length,
        totalTimerTime: lap.length,
      });
    }

    encoder.writeMesg({
      mesgNum: Profile.MesgNum.EVENT,
      event: 'timer',
      eventType: 'stop',
      timestamp,
    });

    encoder.writeMesg({
      mesgNum: Profile.MesgNum.SESSION,
      sport: 'cycling',
      subSport: 'indoorCycling',
      numLaps: laps.length,
      startTime,
      timestamp,
      totalElapsedTime: this.records.length,
      totalTimerTime: this.records.length,
      totalDistance: distance,
      totalCalories: this.calories,
    });

    encoder.writeMesg({
      mesgNum: Profile.MesgNum.ACTIVITY,
      numSessions: 1,
      timestamp,
      totalTimerTime: this.records.length,
    });

    return encoder.close();
  }

  toCanvas() {
    const aspect = 5 / 2;
    const w = 2000;
    const h = w * (1 / aspect);
    const x = (value) => w * (value / 100);
    const y = (value) => h * (1 - value / 100);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = colors.shade8.hex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = colors.shade6.hex;
    for (const lineY of [25, 50, 75]) {
      ctx.beginPath();
      ctx.moveTo(x(0), y(lineY));
      ctx.lineTo(x(100), y(lineY));
      ctx.stroke();
    }

    const data = [
      { polylines: this.polylinesHeartRate, style: colors.red.hex },
      { polylines: this.polylinesPower, style: colors.brand3.hex },
    ];
    for (const { polylines, style } of data) {
      ctx.lineWidth = 8;
      ctx.strokeStyle = style;
      for (const polyline of polylines) {
        ctx.beginPath();
        for (let i = 0; i < polyline.length; i += 2) {
          const pointX = polyline[i];
          const pointY = polyline[i + 1];
          if (i === 0) {
            ctx.moveTo(x(pointX), y(pointY));
          } else {
            ctx.lineTo(x(pointX), y(pointY));
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
  records: array(schema(Record), Records),
  ftp: primitive(),
  averagePower: primitive(),
  averageHeartRate: primitive(),
  averageCadence: primitive(),
  polylinesPower: array(array(primitive())),
  polylinesHeartRate: array(array(primitive())),
});
