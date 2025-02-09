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
import { toSIBodies, fromSIBodies } from './simulation/units';
import { rk4Step, Vector3D } from './simulation/DimBerechnung';
import './styles/App.css';

let durchlauf = 0;
let tage = 0;
function App() {
  
  // TimeStep wird jetzt als Multiplikator verwendet
  const [timeStep, setTimeStep] = useState(5);
  const animationFrameRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [resetCam, setResetCam] = useState(false);

  const [showEdges, setShowEdges] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showBahnen, setShowBahnen] = useState(true);
  const [showStars, setShowStars] = useState(false);
  const [bahnenHistory, setBahnenHistory] = useState<Vector3D[][]>([[], [], []]);

  // Speichert die Original-Preset-Werte
  const [selectedConditions, setSelectedConditions] = useState(defaultConditions);
  // Speichert die aktuell angezeigten Werte (inkl. Benutzeränderungen)
  const [bodies, setBodies] = useState(selectedConditions.bodies);
  // Speichert die letzten Benutzereingaben vor dem Start der Simulation
  const [lastUserInput, setLastUserInput] = useState(selectedConditions.bodies);
  // Speichert die Indizes der verwendeten Himmelskörper
  const [usedBodies, setUsedBodies] = useState(defaultConditions.usedBodies);

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

      // Konvertieren ins SI-System
      let siBodies = toSIBodies(currentBodies);
      
      const dt = 1800; // 720 Sekunden pro Schritt
      
      for (let i = 0; i < steps; i++) {
        // RK4-Aufruf
        siBodies = rk4Step(siBodies, dt);
        durchlauf++;
      }

      if (durchlauf == 48) {
        tage++;
        console.log('Tag nr: ' + tage);
        durchlauf = 0;
      }
      // Zurückkonvertieren ins SI-System
      currentBodies = fromSIBodies(siBodies);

      // Aktualisiere den State nur mit dem letzten Ergebnis
      setBodies(currentBodies);
      
      // Aktualisiere die Bahnhistorie
      setBahnenHistory(prevHistory => {
        const newHistory = prevHistory.map((bodyHistory, index) => {
          const limitedHistory = [...bodyHistory.slice(-9999), currentBodies[index].position];
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
          onSelect={(newConfig) => {
            setSelectedConditions(newConfig);
            setBodies(newConfig.bodies);
            setLastUserInput(newConfig.bodies);
            setUsedBodies(newConfig.usedBodies);
            setIsRunning(false);
            setBahnenHistory([[], [], []]);
            setResetCam(true);
            setCamMode('default');
            setTimeStep(5);
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
          usedBodies={usedBodies}
          showEdges={showEdges}
          showGrid={showGrid}
          showBahnen={showBahnen}
          showStars={showStars}
          bahnenHistory={bahnenHistory}
        />
        <OrbitControls
          enablePan={camMode !== 'default' && camMode !== '3VP' && camMode !== 'FVP'}
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
            celestialBodyIndex={usedBodies[index]}
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
            setTimeStep(5);
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
          showStars={showStars}
          onToggleStars={() => setShowStars(prev => !prev)}
        />
        <CameraControls 
          camMode={camMode} 
          setCamMode={setCamMode}
          selectedBody={selectedBody}
          setSelectedBody={setSelectedBody}
          usedBodies={usedBodies}
        />
      </div>
    </div>
  );
}

export default App;
