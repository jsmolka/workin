import { Xml } from '../utils/xml';

export function tcx(activity) {
  const now = new Date(activity.date);

  const xml = new Xml();
  xml.node('TrainingCenterDatabase', [
    Xml.attribute(
      'xsi:schemaLocation',
      'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
    ),
    Xml.attribute('xmlns:ns2', 'http://www.garmin.com/xmlschemas/UserProfile/v2'),
    Xml.attribute('xmlns:ns3', 'http://www.garmin.com/xmlschemas/ActivityExtension/v2'),
    Xml.attribute('xmlns:ns5', 'http://www.garmin.com/xmlschemas/ActivityGoals/v1'),
    Xml.attribute('xmlns', 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'),
    Xml.attribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'),
    Xml.attribute('xmlns:ns4', 'http://www.garmin.com/xmlschemas/ProfileExtension/v1'),
    Xml.attribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema'),
  ]);
  xml.node('Activities');
  xml.node('Activity', [Xml.attribute('Sport', 'Biking')]);
  xml.leaf('Id', now.toISOString());

  let meters = 0;
  for (const data of activity.laps) {
    xml.node('Lap', [Xml.attribute('StartTime', now.toISOString())]);
    xml.node('Track');

    for (const item of data) {
      xml.node('Trackpoint');
      xml.leaf('Time', now.toISOString());
      xml.leaf('DistanceMeters', meters);

      if (item.power != null) {
        xml.node('Extensions');
        xml.node('ns3:TPX');
        xml.leaf('ns3:Watts', item.power);
        xml.end();
        xml.end();
      }

      if (item.heartRate != null) {
        xml.node('HeartRateBpm');
        xml.leaf('Value', item.heartRate);
        xml.end('HeartRateBpm');
      }

      if (item.cadence != null) {
        xml.leaf('Cadence', item.cadence);
      }

      xml.end();

      now.setSeconds(now.getSeconds() + 1);
      meters += 8.33333; // 30 km/h
    }
    xml.end();
    xml.end();
  }
  xml.end();
  xml.end();
  xml.end();

  return xml.toString();
}
