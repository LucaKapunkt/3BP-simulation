/**
 * Vordefinierte Simulationszustände
 * 
 * Diese Datei enthält verschiedene interessante Ausgangskonfigurationen für die Simulation:
 * - Standardkonfiguration für den ersten Start
 * - Spezielle astronomische Konstellationen
 * - Beispiele für chaotische und stabile Systeme
 */

import { createVector3D, createCelestialBody, type CelestialBodyData } from '../simulation/Berechnung';

// Standardkonfiguration
export const defaultConditions: CelestialBodyData[] = [
  // Körper 1: Blau
  createCelestialBody(
    createVector3D(-25, 0, 15),
    createVector3D(6, 2, 0),
    1000
  ),
  // Körper 2: Rot
  createCelestialBody(
    createVector3D(20, 0, 20),
    createVector3D(2, 7, 0),
    1000
  ),
  // Körper 3: Grün
  createCelestialBody(
    createVector3D(0, 0, -20),
    createVector3D(-5, -8, 0),
    1000
  )
];

// Symmetrische Dreiecksformation
export const triangleConditions: CelestialBodyData[] = [
  createCelestialBody(
    createVector3D(0, 0, 20),
    createVector3D(5, 0, 0),
    1000
  ),
  createCelestialBody(
    createVector3D(17.32, 0, -10),
    createVector3D(-2.5, 0, -4.33),
    1000
  ),
  createCelestialBody(
    createVector3D(-17.32, 0, -10),
    createVector3D(-2.5, 0, 4.33),
    1000
  )
];

// Chaotische Konfiguration
export const chaoticConditions: CelestialBodyData[] = [
  createCelestialBody(
    createVector3D(-20, 10, 0),
    createVector3D(3, -2, 1),
    1000
  ),
  createCelestialBody(
    createVector3D(15, -15, 10),
    createVector3D(-1, 3, -2),
    1000
  ),
  createCelestialBody(
    createVector3D(5, 5, -10),
    createVector3D(-2, -1, 1),
    1000
  )
];

// Sammlung verschiedener Presets
export const presets: Record<string, CelestialBodyData[]> = {
  "Standard": defaultConditions,
  "Dreieck": triangleConditions,
  "Chaotisch": chaoticConditions
};
