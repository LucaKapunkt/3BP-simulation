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
  // Körper 1: Schwerer zentraler Körper (Blau)
  createCelestialBody(
    createVector3D(15, 0, 0),     // Position im Ursprung
    createVector3D(0, 0, 25),     // Keine Anfangsgeschwindigkeit
    1000                        // Schwerer Körper
  ),
  // Körper 2: Vorbeifliegender Körper
  createCelestialBody(
    createVector3D(300, 10, 0),    // Startposition auf X-Achse
    createVector3D(-10, 0, 0),     // Geschwindigkeit in Y-Richtung für Orbit
    3000                         // Leichter Körper
  ),
  // Körper 3: Schwerer zentraler KörperVorbeifliegender Körper (Grün)
  createCelestialBody(
    createVector3D(0, 0, 0),  // Startet weit entfernt
    createVector3D(0, 0, -2),  // Geschwindigkeit für nahen Vorbeiflug
    10000                         // Mittlerer Körper
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
  // Körper 1: Blau
  createCelestialBody(
    createVector3D(-10, 0, 0),     // Position
    createVector3D(3.682716, 1.506084, 0),      // Geschwindigkeit * 12
    1000
  ),
  // Körper 2: Rot
  createCelestialBody(
    createVector3D(10, 0, 0),      // Position
    createVector3D(3.682716, 1.506084, 0),     // Geschwindigkeit * 12
    1000
  ),
  // Körper 3: Grün
  createCelestialBody(
    createVector3D(0, 0, 10),      // Position
    createVector3D(-7.365432, -3.012168, 0),     // Geschwindigkeit * 12 (-2*p1, -2*p2)
    1000
  )
];

// Sandbox-Konfiguration mit Körpern nahe beieinander
export const sandboxConditions: CelestialBodyData[] = [
  createCelestialBody(
    createVector3D(5, 0, 0),    // Position nahe am Ursprung
    createVector3D(0, 0, 0),    // Keine Anfangsgeschwindigkeit
    1000
  ),
  createCelestialBody(
    createVector3D(0, 0, 0),    // Leicht versetzt auf der X-Achse
    createVector3D(0, 0, 0),    // Keine Anfangsgeschwindigkeit
    1000
  ),
  createCelestialBody(
    createVector3D(-5, 0, 0),    // Leicht versetzt auf der Y-Achse
    createVector3D(0, 0, 0),    // Keine Anfangsgeschwindigkeit
    1000
  )
];

// Sammlung verschiedener Presets
export const presets: Record<string, CelestialBodyData[]> = {
  "Standard": defaultConditions,
  "Dreieck": triangleConditions,
  "Chaotisch": chaoticConditions,
  "Sandbox": sandboxConditions
};
