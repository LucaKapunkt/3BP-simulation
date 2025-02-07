// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './components/Scene';
import PresetSelection from './components/controls/PresetSelection';
import BodyControls from './components/controls/BodyControls';
import SimulationControls from './components/controls/SimulationControls';
import VisualizationControls from './components/controls/VisualizationControls';
import CameraControls, { CamMode } from './components/controls/CameraControls';
import CameraUpdater from './components/CameraUpdater';
import { defaultConditions } from './data/initialConditions';
import { calculateNextStep, type Vector3D } from './simulation/Berechnung';
import './styles/App.css';


function App() {
  // Konstanter, kleiner Zeitschritt für hohe Genauigkeit
  const FIXED_TIMESTEP = 0.001;
  // TimeStep wird jetzt als Multiplikator verwendet
  const [timeStep, setTimeStep] = useState(1);
  const animationFrameRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [resetCam, setResetCam] = useState(false);

  const [showEdges, setShowEdges] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showBahnen, setShowBahnen] = useState(false);
  const [bahnenHistory, setBahnenHistory] = useState<Vector3D[][]>([[], [], []]);

  // Speichert die Original-Preset-Werte
  const [selectedConditions, setSelectedConditions] = useState(defaultConditions);
  // Speichert die aktuell angezeigten Werte (inkl. Benutzeränderungen)
  const [bodies, setBodies] = useState(selectedConditions);
  // Speichert die letzten Benutzereingaben vor dem Start der Simulation
  const [lastUserInput, setLastUserInput] = useState(selectedConditions);

  const [camMode, setCamMode] = useState<CamMode>('default');
  const [selectedBody, setSelectedBody] = useState(1);

  // Aktualisiere lastUserInput wenn die Simulation gestartet wird
  useEffect(() => {
    if (isRunning) {
      setLastUserInput(bodies);
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    const animate = () => {
      // Führe mehrere Berechnungsschritte durch
      let currentBodies = bodies;
      const steps = Math.round(timeStep);
      
      for (let i = 0; i < steps; i++) {
        const nextStep = calculateNextStep({ bodies: currentBodies, timeStep: FIXED_TIMESTEP });
        currentBodies = currentBodies.map((body, index) => ({
          ...body,
          position: nextStep.positions[index],
          velocity: nextStep.velocities[index]
        }));
      }

      // Aktualisiere den State nur mit dem letzten Ergebnis
      setBodies(currentBodies);
      
      // Aktualisiere die Bahnhistorie
      setBahnenHistory(prevHistory => {
        const newHistory = prevHistory.map((bodyHistory, index) => {
          const limitedHistory = [...bodyHistory.slice(-999), currentBodies[index].position];
          return limitedHistory;
        });
        return newHistory;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning, bodies, timeStep]);

  return (
    <div className="app-container">
      <div className="preset-container">
        <PresetSelection
          onSelect={(newBodies) => {
            // Bei Preset-Auswahl: Setze beide States auf die Original-Preset-Werte
            setSelectedConditions(newBodies);
            setBodies(newBodies);
            setLastUserInput(newBodies);
            setIsRunning(false);
            setBahnenHistory([[], [], []]);
            setResetCam(true);
            setCamMode('default');
          }}
        />
      </div>
      <Canvas 
        camera={{ 
          position: [0, 10, 15], 
          fov: 75,
          near: 0.1,        // Minimale Sichtweite
          far: 2000         // Maximale Sichtweite
        }}
      >
        <CameraUpdater
          camMode={camMode}
          selectedBody={selectedBody}
          bodies={bodies}
          resetCam={resetCam}
          setResetCam={setResetCam}
        />
        <Scene
          bodies={bodies}
          showEdges={showEdges}
          showGrid={showGrid}
          showBahnen={showBahnen}
          bahnenHistory={bahnenHistory}
        />
        <OrbitControls
          enableZoom={camMode === 'default' || camMode === '3VP'}
          enableRotate={camMode === 'default' || camMode === '3VP'}
          enablePan={camMode === 'default'}
        />
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
              setBahnenHistory([[], [], []]);
            }}
            index={index}
            isRunning={isRunning}
          />
        ))}
      </div>
      <div className="controls-container">
        <SimulationControls
          isRunning={isRunning}
          onToggleRunning={() => setIsRunning(prev => !prev)}
          onReset={() => {
            // Bei Reset: Stelle die letzten Benutzereingaben wieder her
            setBodies(lastUserInput);
            setIsRunning(false);
            setBahnenHistory([[], [], []]);
            setCamMode('default');
            setSelectedBody(1);
            setResetCam(true);
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
        <CameraControls 
          camMode={camMode} 
          setCamMode={setCamMode}
          selectedBody={selectedBody}
          setSelectedBody={setSelectedBody}
        />
      </div>
    </div>
  );
}

export default App;
