import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import './App.css'

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
const Scene: React.FC = () => {
  console.log('Scene gerendert')
  return (
    <>
      {/* Umgebungslicht für bessere Sichtbarkeit */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Die drei Himmelskörper */}
      <CelestialBody position={[-4, 0, 0]} color="blue" />
      <CelestialBody position={[0, 0, 0]} color="red" />
      <CelestialBody position={[4, 0, 0]} color="green" />
    </>
  )
}

function App() {
  console.log('App gerendert')
  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 15, 15], fov: 75 }}>
        <Scene />
        <OrbitControls />
      </Canvas>
      <div className="controls-container">
        {/* Hier werden später die Steuerelemente hinzugefügt */}
      </div>
    </div>
  )
}

export default App
