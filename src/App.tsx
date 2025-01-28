import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { calculateNextStep, createVector3D, createCelestialBody, type CelestialBodyData, type Vector3D } from './berechnung'

// Komponente für einen einzelnen Himmelskörper
const CelestialBody: React.FC<{ position: [number, number, number], color: string }> = ({ position, color }) => {
  console.log('CelestialBody gerendert:', { position, color })
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Komponente für die Eingabe eines 3D-Vektors
const VectorInput: React.FC<{
  label: string;
  value: Vector3D;
  onChange: (newValue: Vector3D) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className="vector-input">
      <label>{label}</label>
      <div className="vector-fields">
        <input
          type="number"
          value={value.x}
          onChange={(e) => onChange({ ...value, x: parseFloat(e.target.value) || 0 })}
          placeholder="X"
        />
        <input
          type="number"
          value={value.y}
          onChange={(e) => onChange({ ...value, y: parseFloat(e.target.value) || 0 })}
          placeholder="Y"
        />
        <input
          type="number"
          value={value.z}
          onChange={(e) => onChange({ ...value, z: parseFloat(e.target.value) || 0 })}
          placeholder="Z"
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
}> = ({ body, onChange, bodyName }) => {
  return (
    <div className="body-controls">
      <h3>{bodyName}</h3>
      <VectorInput
        label="Position"
        value={body.position}
        onChange={(newPosition) => onChange({ ...body, position: newPosition })}
      />
      <VectorInput
        label="Geschwindigkeit"
        value={body.velocity}
        onChange={(newVelocity) => onChange({ ...body, velocity: newVelocity })}
      />
      <div className="mass-input">
        <label>Masse</label>
        <input
          type="number"
          value={body.mass}
          onChange={(e) => onChange({ ...body, mass: parseFloat(e.target.value) || 0 })}
          min="0"
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
    <div className="controls-container">
      <div className="simulation-controls">
        <button onClick={onToggleRunning}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={onReset}>Reset</button>
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
      <div className="bodies-controls">
        {bodies.map((body, index) => (
          <BodyControls
            key={index}
            body={body}
            onChange={(newBody) => {
              const newBodies = [...bodies];
              newBodies[index] = newBody;
              onBodiesChange(newBodies);
            }}
            bodyName={`Körper ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Hauptkomponente für die 3D-Szene
const Scene: React.FC<{ bodies: CelestialBodyData[] }> = ({ bodies }) => {
  console.log('Scene gerendert mit bodies:', bodies)
  return (
    <>
      {/* Umgebungslicht für bessere Sichtbarkeit */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Die drei Himmelskörper */}
      {bodies.map((body, index) => {
        const position: [number, number, number] = [
          body.position.x,
          body.position.y,
          body.position.z
        ]
        const colors = ['blue', 'red', 'green']
        return (
          <CelestialBody
            key={index}
            position={position}
            color={colors[index]}
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
    createVector3D(-4, 0, 0),  // Position
    createVector3D(0, 0.5, 0), // Geschwindigkeit
    1000                       // Masse
  ),
  // Körper 2: Rot
  createCelestialBody(
    createVector3D(0, 0, 0),   // Position
    createVector3D(0, 0, 0),   // Geschwindigkeit
    2000                       // Masse
  ),
  // Körper 3: Grün
  createCelestialBody(
    createVector3D(4, 0, 0),   // Position
    createVector3D(0, -0.5, 0),// Geschwindigkeit
    1000                       // Masse
  )
]

function App() {
  console.log('App gerendert')

  // Simulation Parameters
  const [timeStep, setTimeStep] = useState(0.01)
  const animationFrameRef = useRef<number>()
  const [isRunning, setIsRunning] = useState(false)

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
        <Scene bodies={bodies} />
        <OrbitControls />
      </Canvas>
      <ControlPanel
        bodies={bodies}
        onBodiesChange={setBodies}
        isRunning={isRunning}
        onToggleRunning={() => setIsRunning(prev => !prev)}
        onReset={() => setBodies(initialBodies)}
        timeStep={timeStep}
        onTimeStepChange={setTimeStep}
      />
    </div>
  )
}

export default App
