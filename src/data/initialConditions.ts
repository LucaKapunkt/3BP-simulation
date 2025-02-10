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
  usedBodies: [2, 2, 2], // Venus, Mars, Jupiter
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(0, 0, 20),           // Spitze des Dreiecks
        createVector3D(0.9, 0, 0),          // Tangentiale Geschwindigkeit (10% langsamer)
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(17.32, 0, -10),      // Rechte untere Ecke (20 * sin(60), 0, -20 * cos(60))
        createVector3D(-0.45, 0, -0.779),   // Tangentiale Geschwindigkeit (10% langsamer)
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(-17.32, 0, -10),     // Linke untere Ecke (-20 * sin(60), 0, -20 * cos(60))
        createVector3D(-0.45, 0, 0.779),    // Tangentiale Geschwindigkeit (10% langsamer)
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      )
    ];
  }
};
export const triangleConditions: PresetConfig = triangleConfig;

// Chaotische Konfiguration
const chaoticOneConfig = {
  usedBodies: [2, 4, 5], // Erde, Mars, Jupiter
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(0, 0, 100),
        createVector3D(3, 0, -5.2),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(86.6, 0, -50),
        createVector3D(-1.5, 0, 4.33),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(-86.6, 0, -50),
        createVector3D(-1.5, 0, -4.33),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      )
    ];
  }
};
export const chaoticOneConditions: PresetConfig = chaoticOneConfig;

// Sandbox-Konfiguration
const außenseiterConfig = {
  usedBodies: [6, 7, 8], // Erde, Mond, Sonne
  get bodies() {
    return [
      createCelestialBody(
        createVector3D(0, 0.6, 1600),
        createVector3D(0, 0.8, -1.5),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(-50, 0, 0),
        createVector3D(0, 1, -1.2),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE  // Mond
      ),
      createCelestialBody(
        createVector3D(50, 0, 0),
        createVector3D(0, 1, 1.2),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE  // Sonne
      )
    ];
  }
};
export const außenseiterConditions: PresetConfig = außenseiterConfig;

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
        createVector3D(5790.92, 0, 0),
        createVector3D(0, 0, 47),  // Merkur: 47 (entspricht 47.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(10820.95, 0, 0),
        createVector3D(0, 0, 35),  // Venus: 35 (35.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(14959.83, 0, 0),
        createVector3D(0, 0, 30),  // Erde: 30 (30.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[3]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(22794.38, 0, 0),
        createVector3D(0, 0, 24),  // Mars: 24 (24.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[4]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(77834.08, 0, 0),
        createVector3D(0, 0, 13),  // Jupiter: 13 (13.000 m/s)
        CELESTIAL_BODIES[this.usedBodies[5]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(142666.64, 0, 0),
        createVector3D(0, 0, 9.7), // Saturn: 9.7 (9.700 m/s)
        CELESTIAL_BODIES[this.usedBodies[6]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(287065.82, 0, 0),
        createVector3D(0, 0, 6.8), // Uranus: 6.8 (6.800 m/s)
        CELESTIAL_BODIES[this.usedBodies[7]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(449839.64, 0, 0),
        createVector3D(0, 0, 5.4), // Neptun: 5.4 (5.400 m/s)
        CELESTIAL_BODIES[this.usedBodies[8]].mass / MASS_SCALE
      ),
      createCelestialBody(
        createVector3D(14998.27, 0, 0),
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
  "Chaotisch": chaoticOneConditions,
  "Außenseiter": außenseiterConditions,
  "Vergleich": vergleichConditions,
  "Sonnensystem": sonnenSystemConditions
};
