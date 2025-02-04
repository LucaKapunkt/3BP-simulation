import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Edges } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { calculateNextStep, createVector3D, createCelestialBody, type CelestialBodyData, type Vector3D } from './berechnung'

// Komponente für einen einzelnen Himmelskörper
const CelestialBody: React.FC<{ position: [number, number, number], color: string, showEdges: boolean }> = ({ position, color, showEdges }) => {
  console.log('CelestialBody gerendert:', { position, color })
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
      {showEdges && (
        <Edges
          scale={1}
          threshold={1}
          color="white"
        />
      )}
    </mesh>
  )
}

// Komponente für die Eingabe eines 3D-Vektors
const VectorInput: React.FC<{
  label: string;
  value: Vector3D;
  onChange: (newValue: Vector3D) => void;
  isRunning: boolean;
}> = ({ label, value, onChange, isRunning }) => {
  const formatValue = (val: number) => {
    if (isRunning) return val.toFixed(2);
    const str = val.toString();
    if (str.startsWith('0') && str.length > 1 && str[1] !== '.') {
      return str.substring(1);
    }
    return str;
  };

  return (
    <div className="vector-input">
      <label>{label}</label>
      <div className="vector-fields">
        <input
          type="number"
          value={formatValue(value.x)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== ',') {
              val = val.substring(1);
            }
            onChange({ ...value, x: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="X"
          readOnly={isRunning}
        />
        <input
          type="number"
          value={formatValue(value.y)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== ',') {
              val = val.substring(1);
            }
            onChange({ ...value, y: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="Y"
          readOnly={isRunning}
        />
        <input
          type="number"
          value={formatValue(value.z)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== ',') {
              val = val.substring(1);
            }
            onChange({ ...value, z: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="Z"
          readOnly={isRunning}
        />
      </div>
    </div>
  )
}

// Komponente für die Steuerung eines einzelnen Himmelskörpers
const BodyControls: React.FC<{
  body: CelestialBodyData;
  onChange: (newBody: CelestialBodyData) => void;
  bodyName: string;
  isRunning: boolean;
}> = ({ body, onChange, bodyName, isRunning }) => {
  return (
    <div className="body-controls">
      <h3>{bodyName}</h3>
      <VectorInput
        label="Position"
        value={body.position}
        onChange={(newPosition) => onChange({ ...body, position: newPosition })}
        isRunning={isRunning}
      />
      <VectorInput
        label="Geschwindigkeit"
        value={body.velocity}
        onChange={(newVelocity) => onChange({ ...body, velocity: newVelocity })}
        isRunning={isRunning}
      />
      <div className="mass-input">
        <label>Masse</label>
        <input
          type="number"
          value={isRunning ? body.mass.toFixed(2) : body.mass}
          onChange={(e) => onChange({ ...body, mass: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
          readOnly={isRunning}
        />
      </div>
    </div>
  )
}

// Komponente für das Kontrollpanel
const ControlPanel: React.FC<{
  bodies: CelestialBodyData[];
  onBodiesChange: (newBodies: CelestialBodyData[]) => void;
  isRunning: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
  timeStep: number;
  onTimeStepChange: (newTimeStep: number) => void;
}> = ({ bodies, onBodiesChange, isRunning, onToggleRunning, onReset, timeStep, onTimeStepChange }) => {
  return (
    <div className="simulation-controls">
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onToggleRunning}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
      <div className="time-step-control">
        <label>Zeitschritt:</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={timeStep}
          onChange={(e) => onTimeStepChange(parseFloat(e.target.value))}
        />
        <span>{timeStep.toFixed(3)}</span>
      </div>
    </div>
  )
}

// Komponente für die Visualisierungs-Steuerung
const VisualizationControls: React.FC<{
  showEdges: boolean;
  onToggleEdges: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showBahnen: boolean;
  onToggleBahnen: () => void;
}> = ({ showEdges, onToggleEdges, showGrid, onToggleGrid, showBahnen, onToggleBahnen }) => {
  return (
    <div className="visualization-controls">
      <button 
        onClick={onToggleEdges}
        className={showEdges ? 'active' : 'inactive'}
      >
        Edges
      </button>
      <button 
        onClick={onToggleBahnen}
        className={showBahnen ? 'active' : 'inactive'}
      >
        Bahnen
      </button>
      <button 
        onClick={onToggleGrid}
        className={showGrid ? 'active' : 'inactive'}
      >
        Grid
      </button>
    </div>
  )
}

// Komponente für die Bahnen der Himmelskörper
const Bahn: React.FC<{ 
  positions: Vector3D[],
  color: string 
}> = ({ positions, color }) => {
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

// Hauptkomponente für die 3D-Szene
const Scene: React.FC<{ 
  bodies: CelestialBodyData[];
  showEdges: boolean;
  showGrid: boolean;
  showBahnen: boolean;
  bahnenHistory: Vector3D[][];
}> = ({ bodies, showEdges, showGrid, showBahnen, bahnenHistory }) => {
  console.log('Scene gerendert mit bodies:', bodies)
  const colors = ['blue', 'red', 'green']
  
  return (
    <>
      {/* Umgebungslicht für bessere Sichtbarkeit */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Koordinatensystem */}
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
      
      {/* Die Bahnen der Himmelskörper */}
      {showBahnen && bahnenHistory.map((positions, index) => (
        <Bahn
          key={`bahn-${index}`}
          positions={positions}
          color={colors[index]}
        />
      ))}
      
      {/* Die drei Himmelskörper */}
      {bodies.map((body, index) => {
        const position: [number, number, number] = [
          body.position.x,
          body.position.y,
          body.position.z
        ]
        return (
          <CelestialBody
            key={index}
            position={position}
            color={colors[index]}
            showEdges={showEdges}
          />
        )
      })}
    </>
  )
}

// Anfangszustand der Simulation
const initialBodies: CelestialBodyData[] = [
  // Körper 1: Blau
  createCelestialBody(
    createVector3D(-25, 0, 15),                    // Position
    createVector3D(6, 2, 0),       // Geschwindigkeit
    1000                                         // Masse
  ),
  // Körper 2: Rot
  createCelestialBody(
    createVector3D(20, 0, 20),                     // Position
    createVector3D(2, 7, 0),       // Geschwindigkeit
    1000                                         // Masse
  ),
  // Körper 3: Grün
  createCelestialBody(
    createVector3D(0, 0, -20),                     // Position
    createVector3D(-5, -8, 0),     // Geschwindigkeit
    1000                                         // Masse
  )
]

function App() {
  console.log('App gerendert')

  // Simulation Parameters
  const [timeStep, setTimeStep] = useState(0.01)
  const animationFrameRef = useRef<number>()
  const [isRunning, setIsRunning] = useState(false)

  // Visualization Parameters
  const [showEdges, setShowEdges] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [showBahnen, setShowBahnen] = useState(false)
  const [bahnenHistory, setBahnenHistory] = useState<Vector3D[][]>([[], [], []])

  // State für die Himmelskörper
  const [bodies, setBodies] = useState<CelestialBodyData[]>(() => initialBodies)

  // Animation Loop
  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const animate = () => {
      // Berechne den nächsten Schritt
      const nextStep = calculateNextStep({
        bodies,
        timeStep
      })

      // Aktualisiere die Körper mit den neuen Positionen und Geschwindigkeiten
      setBodies(prevBodies => 
        prevBodies.map((body, index) => ({
          ...body,
          position: nextStep.positions[index],
          velocity: nextStep.velocities[index]
        }))
      )

      // Aktualisiere die Positionshistorie für die Bahnen
      setBahnenHistory(prevHistory => {
        const newHistory = prevHistory.map((bodyHistory, index) => {
          // Begrenze die Historie auf 1000 Punkte pro Körper
          const limitedHistory = [...bodyHistory.slice(-999), nextStep.positions[index]]
          return limitedHistory
        })
        return newHistory
      })

      // Nächster Frame
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, bodies, timeStep])

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
        <ControlPanel
          bodies={bodies}
          onBodiesChange={setBodies}
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
      </div>
    </div>
  )
}

export default App
