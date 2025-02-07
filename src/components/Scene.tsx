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
import { Grid, useTexture } from '@react-three/drei';
import CelestialBody from './celestial/CelestialBody';
import Bahn from './celestial/Bahn';
import { Vector3D, CelestialBodyData } from '../simulation/Berechnung';
import * as THREE from 'three';

interface SceneProps {
  bodies: CelestialBodyData[];
  showEdges: boolean;
  showGrid: boolean;
  showBahnen: boolean;
  bahnenHistory: Vector3D[][];
}

const Scene: React.FC<SceneProps> = ({ bodies, showEdges, showGrid, showBahnen, bahnenHistory }) => {
  const colors = ['blue', 'red', 'green'];
  
  // Lade die Hintergrundtextur für den Skydome
  const spaceTexture = useTexture('./assets/stars.jpg');

  return (
    <>
      {/* Skydome */}
      <mesh>
        <sphereGeometry args={[1000, 30, 30]} /> {/* Große Kugel für den Hintergrund */}
        <meshBasicMaterial
          map={spaceTexture}
          side={THREE.BackSide}  // Innenseite der Kugel anzeigen
        />
      </mesh>
      
      {/* Erhöhe das Umgebungslicht für bessere Grundbeleuchtung */}
      <ambientLight intensity={2.5} />
      
      {showGrid && (
        <Grid
          args={[1000, 1000]}
          position={[0, -50, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#666"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#aaa"
          fadeDistance={200}
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
          <CelestialBody 
            key={index} 
            position={position} 
            color={colors[index]} 
            showEdges={showEdges}
            mass={body.mass}
            index={index}
          />
        );
      })}
    </>
  );
};

export default Scene;
