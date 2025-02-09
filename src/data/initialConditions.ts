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
  usedBodies: [0, 1, 3], // Erde, Mars, Mond
  get bodies() {
    return [
  createCelestialBody(
        createVector3D(0, 0, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
      ),
  createCelestialBody(
        createVector3D(1000, 1000, 0),
        createVector3D(0, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
      ),
  createCelestialBody(
        createVector3D(38.44, 0, 0),
        createVector3D(0, 0, 1.02),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
      )
    ];
  }
};
export const defaultConditions: PresetConfig = defaultConfig;

// Symmetrische Dreiecksformation
const triangleConfig = {
  usedBodies: [0, 1, 2], // Erde, Mars, Jupiter
  get bodies() {
    return [
  createCelestialBody(
    createVector3D(0, 0, 20),
    createVector3D(5, 0, 0),
        CELESTIAL_BODIES[this.usedBodies[0]].mass / MASS_SCALE
  ),
  createCelestialBody(
    createVector3D(17.32, 0, -10),
    createVector3D(-2.5, 0, -4.33),
        CELESTIAL_BODIES[this.usedBodies[1]].mass / MASS_SCALE
  ),
  createCelestialBody(
    createVector3D(-17.32, 0, -10),
    createVector3D(-2.5, 0, 4.33),
        CELESTIAL_BODIES[this.usedBodies[2]].mass / MASS_SCALE
  )
];
  }
};
export const triangleConditions: PresetConfig = triangleConfig;

// Chaotische Konfiguration
const chaoticConfig = {
  usedBodies: [0, 1, 2], // Erde, Mars, Jupiter
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
  usedBodies: [0, 3, 4], // Erde, Mond, Sonne
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

// Sammlung verschiedener Presets
export const presets: Record<string, PresetConfig> = {
  "Standard": defaultConditions,
  "Dreieck": triangleConditions,
  "Chaotisch": chaoticConditions,
  "Sandbox": sandboxConditions
};
