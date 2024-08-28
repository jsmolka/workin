import { nthRoot } from '@/utils/numeric';

// Based on https://en.wikipedia.org/wiki/Bicycle_performance
// Based on https://www.gribble.org/cycling/power_v_speed.html
// Based on https://www.omnicalculator.com/sports/cycling-wattage

const defaults = {
  g: 9.80665, // Standard gravity in m/s
  rho: 1.204, // Air density at 20°C in kg/m^3
  eta: 0.98, // Energy conversion efficiency (drivetrain loss)
  crr: 0.005, // Coefficient of rolling resistance
  vh: 0, // Headwind velocity in m/s
  cda: 0.321, // Drag coefficient times frontal area in m^2
  gradient: 0, // Gradient in %
  m: 80, // Weight in kg
};

export function speedToPower(v, parameters = {}) {
  const { g, rho, eta, crr, vh, cda, gradient, m } = { ...defaults, ...parameters };
  const Fg = m * g * Math.sin(Math.atan(gradient / 100));
  const Fr = m * g * Math.cos(Math.atan(gradient / 100)) * crr;
  const Fa = 0.5 * cda * rho * (v + vh) ** 2;
  return (1 / eta) * (Fg + Fr + Fa) * v;
}

export function powerToSpeed(p, parameters = {}) {
  const { g, rho, eta, crr, vh, cda, gradient, m } = { ...defaults, ...parameters };
  const a = 0.5 * cda * rho;
  const b = vh * cda * rho;
  const c =
    g * m * (Math.sin(Math.atan(gradient / 100)) + Math.cos(Math.atan(gradient / 100)) * crr) +
    0.5 * cda * rho * vh ** 2;
  const d = -eta * p;

  const Q = (3 * a * c - b ** 2) / (9 * a ** 2);
  const R = (9 * a * b * c - 27 * a ** 2 * d - 2 * b ** 3) / (54 * a ** 3);
  const S = nthRoot(R + Math.sqrt(Q ** 3 + R ** 2), 3);
  const T = nthRoot(R - Math.sqrt(Q ** 3 + R ** 2), 3);
  return S + T - b / (3 * a);
}
