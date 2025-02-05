/**
 * 3D-Szenenkomponente für die Visualisierung der Simulation
 * 
 * Diese Komponente ist verantwortlich für das Rendering der gesamten 3D-Szene und enthält:
 * - Die Himmelskörper mit ihren aktuellen Positionen
 * - Optionale Visualisierungselemente (Gitter, Kanten)
 * - Die Bahnspuren der Himmelskörper
 * - Beleuchtung der Szene
 */

import React from 'react';
import { Grid } from '@react-three/drei';
import CelestialBody from './celestial/CelestialBody';
import Bahn from './celestial/Bahn';
import { Vector3D, CelestialBodyData } from '../simulation/Berechnung';


interface SceneProps {
  bodies: CelestialBodyData[];
  showEdges: boolean;
  showGrid: boolean;
  showBahnen: boolean;
  bahnenHistory: Vector3D[][];
}

const Scene: React.FC<SceneProps> = ({ bodies, showEdges, showGrid, showBahnen, bahnenHistory }) => {
  console.log('Scene gerendert mit bodies:', bodies);
  const colors = ['blue', 'red', 'green'];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {showGrid && (
        <Grid
          args={[100, 100]}
          position={[0, -10, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#666"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#aaa"
          fadeDistance={50}
          fadeStrength={1}
        />
      )}
      {showBahnen && bahnenHistory.map((positions, index) => (
        <Bahn key={`bahn-${index}`} positions={positions} color={colors[index]} />
      ))}
      {bodies.map((body, index) => {
        const position: [number, number, number] = [
          body.position.x,
          body.position.y,
          body.position.z
        ];
        return (
          <CelestialBody key={index} position={position} color={colors[index]} showEdges={showEdges} />
        );
      })}
    </>
  );
};

export default Scene;
