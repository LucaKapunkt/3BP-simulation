/**
 * Komponente zur Darstellung eines einzelnen Himmelskörpers
 * 
 * Rendert einen Himmelskörper als 3D-Kugel mit:
 * - Anpassbarer Position im 3D-Raum
 * - Individueller Textur
 * - Optionaler Kantenhervorhebung
 * 
 * Verwendet Three.js Geometrien und Materialien für die 3D-Darstellung.
 */

import React, { useRef } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CelestialBodyProps {
  position: [number, number, number];
  color: string;
  showEdges: boolean;
  mass: number;
  index: number;
}

const CelestialBody: React.FC<CelestialBodyProps> = ({ position, showEdges, mass, index }) => {
  // Berechne den Radius basierend auf der Masse
  const radius = Math.pow(mass / 1000, 1/3);
  const meshRef = useRef<THREE.Mesh>(null);

  // Wähle die richtige Textur basierend auf dem Index
  const texturePath = index === 0 ? './assets/earth.jpg' : 
                     index === 1 ? './assets/mars.jpg' : 
                     './assets/jupiter.jpg';
  

  const texture = useTexture(texturePath);

  // Rotation der Planeten
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {showEdges && (
        <Edges scale={1} threshold={1} color="white" />
      )}
    </mesh>
  );
};

export default CelestialBody;
