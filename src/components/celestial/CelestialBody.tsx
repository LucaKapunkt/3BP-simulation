/**
 * Komponente zur Darstellung eines einzelnen Himmelskörpers
 * 
 * Rendert einen Himmelskörper als 3D-Kugel mit:
 * - Anpassbarer Position im 3D-Raum
 * - Individueller Farbgebung
 * - Optionaler Kantenhervorhebung
 * 
 * Verwendet Three.js Geometrien und Materialien für die 3D-Darstellung.
 */

import React from 'react';
import { Edges } from '@react-three/drei';

interface CelestialBodyProps {
  position: [number, number, number];
  color: string;
  showEdges: boolean;
  mass: number;
}

const CelestialBody: React.FC<CelestialBodyProps> = ({ position, color, showEdges, mass }) => {
  // Berechne den Radius basierend auf der Masse
  const radius = Math.pow(mass / 1000, 1/3);

  // console.log('CelestialBody gerendert:', { position, color });
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
      {showEdges && (
        <Edges scale={1} threshold={1} color="white" />
      )}
    </mesh>
  );
};

export default CelestialBody;
