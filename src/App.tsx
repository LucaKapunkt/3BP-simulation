/**
 * Hauptkomponente der 3-Körper-Problem Simulation
 * 
 * Diese Datei enthält die zentrale App-Komponente, die das gesamte Layout und die Hauptlogik der Anwendung steuert.
 * Sie verwaltet:
 * - Den Simulationszustand (Position und Geschwindigkeit der Himmelskörper)
 * - Die Animations-Loop für die kontinuierliche Berechnung
 * - Die Visualisierungseinstellungen (Gitter, Kanten, Bahnen)
 * - Die Benutzeroberfläche mit Canvas und Steuerungselementen
 */

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './components/Scene';
import BodyControls from './components/controls/BodyControls';
import SimulationControls from './components/controls/SimulationControls';
import VisualizationControls from './components/controls/VisualizationControls';
import CameraControls from './components/controls/CameraControls';
import { calculateNextStep, createCelestialBody, createVector3D, type CelestialBodyData, type Vector3D } from './simulation/Berechnung';
import './styles/App.css';

const initialBodies: CelestialBodyData[] = [
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

function App() {
  console.log('App gerendert');

  const [timeStep, setTimeStep] = useState(0.01);
  const animationFrameRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);

  // Visualization Parameters
  const [showEdges, setShowEdges] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showBahnen, setShowBahnen] = useState(false);
  const [bahnenHistory, setBahnenHistory] = useState<Vector3D[][]>([[], [], []]);

  // State für die Himmelskörper
  const [bodies, setBodies] = useState<CelestialBodyData[]>(() => initialBodies);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      // Berechne den nächsten Schritt
      const nextStep = calculateNextStep({
        bodies,
        timeStep
      });

      // Aktualisiere die Körper mit den neuen Positionen und Geschwindigkeiten
      setBodies(prevBodies =>
        prevBodies.map((body, index) => ({
          ...body,
          position: nextStep.positions[index],
          velocity: nextStep.velocities[index]
        }))
      );

      // Aktualisiere die Positionshistorie für die Bahnen
      setBahnenHistory(prevHistory => {
        const newHistory = prevHistory.map((bodyHistory, index) => {
          // Begrenze die Historie auf 1000 Punkte pro Körper
          const limitedHistory = [...bodyHistory.slice(-999), nextStep.positions[index]];
          return limitedHistory;
        });
        return newHistory;
      });

      // Nächster Frame
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, bodies, timeStep]);

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 15, 15], fov: 75 }}>
        <Scene 
          bodies={bodies} 
          showEdges={showEdges}
          showGrid={showGrid}
          showBahnen={showBahnen}
          bahnenHistory={bahnenHistory}
        />
        <OrbitControls />
      </Canvas>
      <div className="bodies-container">
        {bodies.map((body, index) => (
          <BodyControls
            key={index}
            body={body}
            onChange={(newBody) => {
              const newBodies = [...bodies];
              newBodies[index] = newBody;
              setBodies(newBodies);
              // Lösche die Bahnen beim Ändern der Körper
              setBahnenHistory([[], [], []]);
            }}
            bodyName={`Körper ${index + 1}`}
            isRunning={isRunning}
          />
        ))}
      </div>
      <div className="controls-container">
        <SimulationControls
          isRunning={isRunning}
          onToggleRunning={() => setIsRunning(prev => !prev)}
          onReset={() => {
            setBodies(initialBodies);
            setIsRunning(false);
            // Lösche die Bahnen beim Reset
            setBahnenHistory([[], [], []]);
          }}
          timeStep={timeStep}
          onTimeStepChange={setTimeStep}
        />
        <VisualizationControls 
          showEdges={showEdges}
          onToggleEdges={() => setShowEdges(prev => !prev)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(prev => !prev)}
          showBahnen={showBahnen}
          onToggleBahnen={() => setShowBahnen(prev => !prev)}
        />
        <CameraControls />
      </div>
    </div>
  );
}

export default App;
