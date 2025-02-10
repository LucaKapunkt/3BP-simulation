/**
 * Vordefinierte Simulationszustände
 * 
 * Diese Datei enthält verschiedene interessante Ausgangskonfigurationen für die Simulation:
 * - Standardkonfiguration für den ersten Start
 * - Spezielle astronomische Konstellationen
 * - Beispiele für chaotische und stabile Systeme
 */

import { createVector3D, createCelestialBody, type CelestialBodyData } from '../simulation/DimBerechnung';
import { CELESTIAL_BODIES } from '../components/celestial/CelestialBody';
import { MASS_SCALE } from '../simulation/units';

// Definition welche Körper in welchem Preset verwendet werden
export interface PresetConfig {
  bodies: CelestialBodyData[];
  usedBodies: number[];  // Indizes der verwendeten Himmelskörper
}

// Standardkonfiguration
const defaultConfig = {
  usedBodies: [3, 9], // Erde, Mond
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(0, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(38.44, 0, 0),
        createVector3D(0, 0, 1.02),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      )
    ];
  }
};
export const defaultConditions: PresetConfig = defaultConfig;

// Symmetrische Dreiecksformation
const triangleConfig = {
  usedBodies: [3, 6, 4], // Erde, Mars, Jupiter
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(500, 0, 20),
        createVector3D(5, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(17.32, 0, -10),
        createVector3D(-2.5, 0, -4.33),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(-17.32, 400, -10),
        createVector3D(-2.5, 0, 4.33),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      )
    ];
  }
};
export const triangleConditions: PresetConfig = triangleConfig;

// Chaotische Konfiguration
const chaoticConfig = {
  usedBodies: [3, 4, 5], // Erde, Mars, Jupiter
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(-10, 0, 0),
        createVector3D(3.682716, 1.506084, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(10, 0, 0),
        createVector3D(3.682716, 1.506084, 0),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(0, 0, 10),
        createVector3D(-7.365432, -3.012168, 0),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      )
    ];
  }
};
export const chaoticConditions: PresetConfig = chaoticConfig;

// Sandbox-Konfiguration
const sandboxConfig = {
  usedBodies: [3, 9, 0], // Erde, Mond, Sonne
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(14710, 0, 0),
        createVector3D(0, 0, 29.78),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(14748.44, 0, 0),
        createVector3D(0, 0, 31),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE  // Mond
      ),
      createCelestialBody(
        createVector3D(0, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE  // Sonne
      )
    ];
  }
};
export const sandboxConditions: PresetConfig = sandboxConfig;

// Sandbox-Konfiguration
const vergleichConfig = {
  usedBodies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // alle Körper
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(150, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE // Sonne
      ),
      createCelestialBody(
        createVector3D(-5, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE  // Merkur
      ),
      createCelestialBody(
        createVector3D(-2, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE  // Venus
      ),
      createCelestialBody(
        createVector3D(0, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[3]].mass / MASS_SCALE  // Erde
      ),
      createCelestialBody(
        createVector3D(-3.7, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[4]].mass / MASS_SCALE  // Mars
      ),
      createCelestialBody(
        createVector3D(55, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[5]].mass / MASS_SCALE  // Jupiter
      ),
      createCelestialBody(
        createVector3D(30, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[6]].mass / MASS_SCALE  // Saturn
      ),
      createCelestialBody(
        createVector3D(11, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[7]].mass / MASS_SCALE  // Uranus
      ),
      createCelestialBody(
        createVector3D(4.5, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[8]].mass / MASS_SCALE  // Neptun
      ),
      createCelestialBody(
        createVector3D(0, 0.8, -1.3),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[9]].mass / MASS_SCALE  // Mond
      )
    ];
  }
};
export const vergleichConditions: PresetConfig = vergleichConfig;

// Sandbox-Konfiguration
const sonnenSystemConfig = {
  usedBodies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // alle Körper
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(0, 0, 0),
        createVector3D(0, 0, 0),   // Sonne: keine Anfangsgeschwindigkeit
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(579.09, 0, 0),
        createVector3D(0, 0, 47),  // Merkur: 47 (entspricht 47.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(1082.09, 0, 0),
        createVector3D(0, 0, 35),  // Venus: 35 (35.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(1495.98, 0, 0),
        createVector3D(0, 0, 30),  // Erde: 30 (30.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[3]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(2279.44, 0, 0),
        createVector3D(0, 0, 24),  // Mars: 24 (24.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[4]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(7783.41, 0, 0),
        createVector3D(0, 0, 13),  // Jupiter: 13 (13.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[5]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(14266.66, 0, 0),
        createVector3D(0, 0, 9.7), // Saturn: 9.7 (9.700 m/s)
        CELESTIAL_BODIES[this.usedBodies[6]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(28706.58, 0, 0),
        createVector3D(0, 0, 6.8), // Uranus: 6.8 (6.800 m/s)
        CELESTIAL_BODIES[this.usedBodies[7]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(44983.96, 0, 0),
        createVector3D(0, 0, 5.4), // Neptun: 5.4 (5.400 m/s)
        CELESTIAL_BODIES[this.usedBodies[8]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(1499.83, 0, 0),
        createVector3D(0, 0, 31),   // Mond: ca. 1 (1.000 m/s, relativ zur Erde)
        CELESTIAL_BODIES[this.usedBodies[9]].mass / MASS_SCALE
      )
    ];
  }
};
export const sonnenSystemConditions: PresetConfig = sonnenSystemConfig;

// Sammlung verschiedener Presets
export const presets: Record<string, PresetConfig> = {
  "Standard": defaultConditions,
  "Dreieck": triangleConditions,
  "Chaotisch": chaoticConditions,
  "Sandbox": sandboxConditions,
  "Vergleich": vergleichConditions,
  "Sonnensystem": sonnenSystemConditions
};
