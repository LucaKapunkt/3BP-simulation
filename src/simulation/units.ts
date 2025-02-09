
import { CelestialBodyData as RK4Body } from './DimBerechnung';


// Beispiel-Interface, das in deinem UI/React-Code verwendet wird
export interface AppBody {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  currentMass: number;
}


// Hier definierst du deine Skalierungsfaktoren
export const DISTANCE_SCALE = 1e7; // 1 UI-Einheit = 10tKm
export const VELOCITY_SCALE = 1000; // 1 UI-Einheit = 1000m/s
//export const MASS_SCALE = 5.97e24; // 1 UI-Einheit = eine Erdmasse
export const MASS_SCALE = 7.35e22; // 1 UI-Einheit = eine Mondmasse
export const G = 6.67430e-11; // Gravitationskonstante in SI-Einheiten



// Hilfsfunktion: App-Body => RK4-Body in SI-Einheiten
export function toSIBodies(appBodies: AppBody[]): RK4Body[] {
  return appBodies.map((b) => ({
    currentMass: b.currentMass * MASS_SCALE, 
    position: {
      x: b.position.x * DISTANCE_SCALE,
      y: b.position.y * DISTANCE_SCALE,
      z: b.position.z * DISTANCE_SCALE,

    },
    velocity: {
      x: b.velocity.x * VELOCITY_SCALE,
      y: b.velocity.y * VELOCITY_SCALE,
      z: b.velocity.z * VELOCITY_SCALE,
    },
  }));
}

// Hilfsfunktion: RK4-Body (SI-Einheiten) => App-Body
export function fromSIBodies(siBodies: RK4Body[]): AppBody[] {
  return siBodies.map((b) => ({
    currentMass: b.currentMass / MASS_SCALE,
    position: {
      x: b.position.x / DISTANCE_SCALE,
      y: b.position.y / DISTANCE_SCALE,
      z: b.position.z / DISTANCE_SCALE,
    },
    velocity: {
      x: b.velocity.x / VELOCITY_SCALE,
      y: b.velocity.y / VELOCITY_SCALE,
      z: b.velocity.z / VELOCITY_SCALE,
    },
  }));
}
