// https://www.highnorth.co.uk/articles/cycling-training-zones
export const zones = [
  { name: 'Active recovery', min: Number.MIN_SAFE_INTEGER, max: 0.55 },
  { name: 'Endurance', min: 0.55, max: 0.75 },
  { name: 'Tempo', min: 0.75, max: 0.9 },
  { name: 'Threshold', min: 0.9, max: 1.05 },
  { name: 'VO2 max', min: 1.05, max: 1.2 },
  { name: 'Anaerobic', min: 1.2, max: 1.3 },
  { name: 'Neuromuscular', min: 1.3, max: Number.MAX_SAFE_INTEGER },
];
