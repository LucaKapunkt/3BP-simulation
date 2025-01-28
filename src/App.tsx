import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { calculateNextStep, createVector3D, createCelestialBody, type CelestialBodyData } from './berechnung'

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

function App() {
  console.log('App gerendert')

  // Simulation Parameters
  const timeStep = 0.01
  const animationFrameRef = useRef<number>()
  const [isRunning, setIsRunning] = useState(false)

  // State für die Himmelskörper
  const [bodies, setBodies] = useState<CelestialBodyData[]>(() => [
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
  ])

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
      <div className="controls-container">
        <button onClick={() => setIsRunning(prev => !prev)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setBodies([
          // Reset auf Anfangspositionen
          createCelestialBody(
            createVector3D(-4, 0, 0),
            createVector3D(0, 0.5, 0),
            1000
          ),
          createCelestialBody(
            createVector3D(0, 0, 0),
            createVector3D(0, 0, 0),
            2000
          ),
          createCelestialBody(
            createVector3D(4, 0, 0),
            createVector3D(0, -0.5, 0),
            1000
          )
        ])}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
