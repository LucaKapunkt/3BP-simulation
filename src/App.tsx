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
  const [timeStep, setTimeStep] = useState(0.01);
  const animationFrameRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);

  const [showEdges, setShowEdges] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showBahnen, setShowBahnen] = useState(false);
  const [bahnenHistory, setBahnenHistory] = useState<Vector3D[][]>([[], [], []]);

  const [selectedConditions, setSelectedConditions] = useState(defaultConditions);
  const [bodies, setBodies] = useState(selectedConditions);
  const [camMode, setCamMode] = useState<CamMode>('default');
  const [selectedBody, setSelectedBody] = useState(1);

  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    const animate = () => {
      const nextStep = calculateNextStep({ bodies, timeStep });
      setBodies(prevBodies =>
        prevBodies.map((body, index) => ({
          ...body,
          position: nextStep.positions[index],
          velocity: nextStep.velocities[index]
        }))
      );
      setBahnenHistory(prevHistory => {
        const newHistory = prevHistory.map((bodyHistory, index) => {
          const limitedHistory = [...bodyHistory.slice(-999), nextStep.positions[index]];
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
            setSelectedConditions(newBodies);
            setBodies(newBodies);
            setIsRunning(false);
            setBahnenHistory([[], [], []]);
          }}
        />
      </div>
      <Canvas camera={{ position: [0, 15, 15], fov: 75 }}>
        <CameraUpdater
          camMode={camMode}
          selectedBody={selectedBody}
          bodies={bodies}
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
            setBodies(selectedConditions);
            setIsRunning(false);
            setBahnenHistory([[], [], []]);
            setCamMode('default');
            setSelectedBody(1);
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
