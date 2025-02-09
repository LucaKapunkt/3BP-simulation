/**
 * Komponente zur Darstellung eines einzelnen Himmelskörpers
 * 
 * Rendert einen Himmelskörper als 3D-Kugel mit:
 * - Spezifischen Eigenschaften für jeden Körper (Erde, Mars, Jupiter)
 * - Individuellen Texturen und Eigenschaften
 * - Maßstabsgetreuen Radien (skaliert für bessere Visualisierung)
 */

import React, { useRef } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DISTANCE_SCALE, MASS_SCALE } from '../../simulation/units';

interface CelestialBodyProps {
  celestialBodyIndex: number;
  position: [number, number, number];
  showEdges: boolean;
  currentMass: number;    // Aktuelle, vom User veränderte Masse
}

interface CelestialBodyAttributes {
  celestialBodyIndex: number;
  name: string;
  mass: number;    // Standard-Masse in kg
  density: number;
  rotationSpeed: number;
  texturePath: string;
  hasAtmosphere?: boolean;
}

// Definitionen der Himmelskörper mit Standardwerten
export const CELESTIAL_BODIES: CelestialBodyAttributes[] = [
  {
    celestialBodyIndex: 0,
    name: "Erde",
    mass: 5.972e24,
    density: 5514,
    rotationSpeed: 0.004,
    texturePath: './assets/earth.jpg',
    hasAtmosphere: true
  },
  {
    celestialBodyIndex: 1,
    name: "Mars",
    mass: 6.39e23,
    density: 3933,
    rotationSpeed: 0.003,
    texturePath: './assets/mars.jpg'
  },
  {
    celestialBodyIndex: 2,
    name: "Jupiter",
    mass: 1.898e27,
    density: 1326,
    rotationSpeed: 0.006,
    texturePath: './assets/jupiter.jpg'
  },
  {
    celestialBodyIndex: 3,
    name: "Mond",
    mass: 7.348e22,
    density: 3340,
    rotationSpeed: 0.004,
    texturePath: './assets/moon.jpg'
  },
  {
    celestialBodyIndex: 4,
    name: "Sonne",
    mass: 1.989e30,
    density: 1408,
    rotationSpeed: 0.004,
    texturePath: './assets/sun.jpg'
  }
];

/**
 * Berechnet den visuellen Radius eines Himmelskörpers basierend auf seiner aktuellen Masse
 */
const calculateVisualRadius = (bodyData: CelestialBodyAttributes, currentMass: number): number => {
  // Berechne den neuen Radius basierend auf der Massendifferenz
  // Verwende die Dichte zur Radiusberechnung: V = m/ρ, r = ∛(3V/4π)
  const volume = currentMass * MASS_SCALE / bodyData.density;
  const newRadius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
  // Konvertiere in Visualisierungseinheiten
  const baseRadius = newRadius / DISTANCE_SCALE;
  return baseRadius;
};

const CelestialBody: React.FC<CelestialBodyProps> = ({ position, showEdges, currentMass, celestialBodyIndex }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const bodyData = CELESTIAL_BODIES[celestialBodyIndex];
  
  // Lade die Textur außerhalb der Render-Funktion
  const texture = useTexture(bodyData.texturePath);
  const cloudsTexture = bodyData.hasAtmosphere ? useTexture('./assets/earth_clouds.jpg') : null;

  // Rotation der Planeten
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += bodyData.rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += bodyData.rotationSpeed * 1.5;
    }
  });

  const visualRadius = calculateVisualRadius(bodyData, currentMass);

  if (bodyData.hasAtmosphere && cloudsTexture) {
    return (
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[visualRadius, 32, 32]} />
          <meshStandardMaterial 
            map={texture}
            normalScale={new THREE.Vector2(2, 2)}
          />
          {showEdges && <Edges scale={1} threshold={1} color="white" />}
        </mesh>
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[visualRadius * 1.01, 32, 32]} />
          <meshStandardMaterial 
            map={cloudsTexture}
            transparent={true}
            opacity={0.6}
            depthWrite={false}
            emissive={"grey"}
            emissiveMap={cloudsTexture}
            emissiveIntensity={0.12}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[visualRadius, 32, 32]} />
        <meshStandardMaterial 
          map={texture}
          normalScale={new THREE.Vector2(2, 2)}
        />
        {showEdges && <Edges scale={1} threshold={1} color="white" />}
      </mesh>
    </group>
  );
};

export default CelestialBody;
