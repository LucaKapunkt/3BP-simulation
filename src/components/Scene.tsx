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
import { Vector3D, CelestialBodyData } from '../simulation/DimBerechnung';
import * as THREE from 'three';

interface SceneProps {
  bodies: CelestialBodyData[];
  usedBodies: number[];
  showEdges: boolean;
  showGrid: boolean;
  showBahnen: boolean;
  showStars: boolean;
  bahnenHistory: Vector3D[][];
}

const Scene: React.FC<SceneProps> = ({ bodies, usedBodies, showEdges, showGrid, showBahnen, showStars, bahnenHistory }) => {
  const colors = [
    '#FFD700',  // Gold für die Sonne
    '#C0C0C0',  // Silber für Merkur
    '#FFA500',  // Orange für Venus
    '#4169E1',  // Royal Blue für die Erde
    '#FF4500',  // Orange Red für Mars
    '#DAA520',  // Goldenrod für Jupiter
    '#F4A460',  // Sandy Brown für Saturn
    '#87CEEB',  // Sky Blue für Uranus
    '#1E90FF',  // Dodger Blue für Neptun
    '#F0F8FF'   // Alice Blue für den Mond
  ];
  
  // Lade die Hintergrundtextur für den Skydome
  const spaceTexture = useTexture('./assets/stars_milkyway.jpg');

  return (
    <>
      {/* Skydome */}
      {showStars && (
        <mesh>
          <sphereGeometry args={[1000, 30, 30]} />
          <meshBasicMaterial
            map={spaceTexture}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Erhöhe das Umgebungslicht für bessere Grundbeleuchtung */}
      <ambientLight intensity={2.5} />
      
      {showGrid && (
        <Grid
          args={[30000, 30000]}
          position={[0, -25, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#666666"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#777777"
          fadeDistance={150}
          fadeStrength={1}
        />
      )}
      {showBahnen && bahnenHistory.map((positions, index) => (
        <Bahn 
          key={`bahn-${index}`} 
          positions={positions} 
          color={colors[usedBodies[index]]} 
        />
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
            showEdges={showEdges}
            currentMass={body.currentMass}
            celestialBodyIndex={usedBodies[index]}
          />
        );
      })}
    </>
  );
};

export default Scene;
