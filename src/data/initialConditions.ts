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
export const defaultConditions: PresetConfig = {
  usedBodies: [0, 1, 2], // Erde, Mars, Jupiter
  bodies: [
    createCelestialBody(
      createVector3D(15, 0, 0),
      createVector3D(0, 0, 25),
      CELESTIAL_BODIES[0].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(300, 10, 0),
      createVector3D(-10, 0, 0),
      CELESTIAL_BODIES[1].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(0, 0, 0),
      createVector3D(0, 0, -2),
      CELESTIAL_BODIES[2].mass / MASS_SCALE
    )
  ]
};

// Symmetrische Dreiecksformation
export const triangleConditions: PresetConfig = {
  usedBodies: [0, 1, 2], // Erde, Mars, Jupiter
  bodies: [
    createCelestialBody(
      createVector3D(0, 0, 20),
      createVector3D(5, 0, 0),
      CELESTIAL_BODIES[0].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(17.32, 0, -10),
      createVector3D(-2.5, 0, -4.33),
      CELESTIAL_BODIES[1].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(-17.32, 0, -10),
      createVector3D(-2.5, 0, 4.33),
      CELESTIAL_BODIES[2].mass / MASS_SCALE
    )
  ]
};

// Chaotische Konfiguration
export const chaoticConditions: PresetConfig = {
  usedBodies: [0, 1, 2], // Erde, Mars, Jupiter
  bodies: [
    createCelestialBody(
      createVector3D(-10, 0, 0),
      createVector3D(3.682716, 1.506084, 0),
      CELESTIAL_BODIES[0].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(10, 0, 0),
      createVector3D(3.682716, 1.506084, 0),
      CELESTIAL_BODIES[1].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(0, 0, 10),
      createVector3D(-7.365432, -3.012168, 0),
      CELESTIAL_BODIES[2].mass / MASS_SCALE
    )
  ]
};

// Sandbox-Konfiguration
export const sandboxConditions: PresetConfig = {
  usedBodies: [0, 3, 2], // Erde, Mond, Jupiter
  bodies: [
    createCelestialBody(
      createVector3D(0, 0, 0),
      createVector3D(0, 0, 0),
      CELESTIAL_BODIES[0].mass / MASS_SCALE
    ),
    createCelestialBody(
      createVector3D(38.44, 0, 0),
      createVector3D(0, 0, 1.02),
      CELESTIAL_BODIES[3].mass / MASS_SCALE  // Mond statt Mars
    ),
    createCelestialBody(
      createVector3D(1000, -1000, 0),
      createVector3D(0, 0, 0),
      CELESTIAL_BODIES[2].mass / MASS_SCALE
    )
  ]
};

// Sammlung verschiedener Presets
export const presets: Record<string, PresetConfig> = {
  "Standard": defaultConditions,
  "Dreieck": triangleConditions,
  "Chaotisch": chaoticConditions,
  "Sandbox": sandboxConditions
};
