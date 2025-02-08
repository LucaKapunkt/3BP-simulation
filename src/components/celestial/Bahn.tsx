/**
 * Komponente zur Visualisierung der Bewegungsbahn eines Himmelskörpers
 * 
 * Zeichnet die zurückgelegte Bahn eines Himmelskörpers als Linie im 3D-Raum:
 * - Verwendet die Positionshistorie des Körpers
 * - Farbliche Kennzeichnung entsprechend des Himmelskörpers
 * - Effiziente Darstellung mittels Three.js BufferGeometry
 */

import React from 'react';
import { Vector3D } from '../../simulation/DimBerechnung';


interface BahnProps {
  positions: Vector3D[];
  color: string;
}

const Bahn: React.FC<BahnProps> = ({ positions, color }) => {
  if (positions.length < 2) return null;

  const points = positions.map(pos => [pos.x, pos.y, pos.z]);

  return (
    <line>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[new Float32Array(points.flat()), 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} />
    </line>
  );
};

export default Bahn;
