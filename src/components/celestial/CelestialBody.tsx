/**
 * Komponente zur Darstellung eines einzelnen Himmelskörpers
 * 
 * Rendert einen Himmelskörper als 3D-Kugel mit:
 * - Spezifischen Eigenschaften für jeden Körper (Erde, Mars, Jupiter)
 * - Individuellen Texturen und Eigenschaften
 * - Maßstabsgetreuen Radien (skaliert für bessere Visualisierung)
 */

import React, { useRef } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { DISTANCE_SCALE, MASS_SCALE } from '../../simulation/units';

interface CelestialBodyProps {
  celestialBodyIndex: number;
  position: [number, number, number];
  showEdges: boolean;
  currentMass: number;    // Aktuelle, vom User veränderte Masse
}

interface CelestialBodyAttributes {
  celestialBodyIndex: number;
  name: string;
  mass: number;    // Standard-Masse in kg
  density: number;
  rotationSpeed: number;
  texturePath: string;
  hasAtmosphere?: boolean;
  atmosphereTexturePath?: string;
  hasRing?: boolean;
  ringTexturePath?: string;
}

// Definitionen der Himmelskörper mit Standardwerten
export const CELESTIAL_BODIES: CelestialBodyAttributes[] = [
  {
    celestialBodyIndex: 0,
    name: "Sonne",
    mass: 1.989e30,
    density: 1408,
    rotationSpeed: 0.004,
    texturePath: './assets/sun.jpg'
  },
  {
    celestialBodyIndex: 1,
    name: "Mercury",
    mass: 3.302e23,
    density: 5427,
    rotationSpeed: 0.004,
    texturePath: './assets/mercury.jpg'
  },
  {
    celestialBodyIndex: 2,
    name: "Venus",
    mass: 4.867e24,
    density: 5243,
    rotationSpeed: 0.004,
    texturePath: './assets/venus.jpg',
    hasAtmosphere: true,
    atmosphereTexturePath: './assets/venus_atmosphere.jpg'
  },
  {
    celestialBodyIndex: 3,
    name: "Erde",
    mass: 5.972e24,
    density: 5514,
    rotationSpeed: 0.004,
    texturePath: './assets/earth.jpg',
    hasAtmosphere: true,
    atmosphereTexturePath: './assets/earth_clouds.jpg'
  },
  {
    celestialBodyIndex: 4,
    name: "Mars",
    mass: 6.39e23,
    density: 3933,
    rotationSpeed: 0.003,
    texturePath: './assets/mars.jpg'
  },
  {
    celestialBodyIndex: 5,
    name: "Jupiter",
    mass: 1.898e27,
    density: 1326,
    rotationSpeed: 0.006,
    texturePath: './assets/jupiter.jpg'
  },
  {
    celestialBodyIndex: 6,
    name: "Saturn",
    mass: 5.683e26,
    density: 687,
    rotationSpeed: 0.004,
    texturePath: './assets/saturn.jpg',
    hasRing: true,
    ringTexturePath: './assets/saturn_ring.png'
  },
  {
    celestialBodyIndex: 7,
    name: "Uranus",
    mass: 8.681e25,
    density: 1270,
    rotationSpeed: 0.004,
    texturePath: './assets/uranus.jpg'
  },
  {
    celestialBodyIndex: 8,
    name: "Neptun",
    mass: 1.024e26,
    density: 1638,
    rotationSpeed: 0.004,
    texturePath: './assets/neptune.jpg'
  },
  {
    celestialBodyIndex: 9,
    name: "Mond",
    mass: 7.348e22,
    density: 3340,
    rotationSpeed: 0.004,
    texturePath: './assets/moon.jpg'
  }
];

/**
 * Berechnet den visuellen Radius eines Himmelskörpers basierend auf seiner aktuellen Masse
 */
const calculateVisualRadius = (bodyData: CelestialBodyAttributes, currentMass: number): number => {
  // Berechne den neuen Radius basierend auf der Massendifferenz
  // Verwende die Dichte zur Radiusberechnung: V = m/ρ, r = ∛(3V/4π)
  const volume = currentMass * MASS_SCALE / bodyData.density;
  const newRadius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
  // Konvertiere in Visualisierungseinheiten
  const baseRadius = newRadius / DISTANCE_SCALE;
  return baseRadius;
};

const CelestialBody: React.FC<CelestialBodyProps> = ({ position, showEdges, currentMass, celestialBodyIndex }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const bodyData = CELESTIAL_BODIES[celestialBodyIndex];
  
  const texture = useTexture(bodyData.texturePath);

  const cloudTexturePath = bodyData.atmosphereTexturePath || './assets/earth_lights.jpg';
  const cloudTexture = useTexture(cloudTexturePath);

  const ringTexturePath = bodyData.ringTexturePath || "./assets/earth_lights.jpg";
  const ringTexture = useTexture(ringTexturePath);
  


  const visualRadius = calculateVisualRadius(bodyData, currentMass);

    return (
      <group position={position}>
      {/* Kugel-Mesh für Oberfläche */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[visualRadius, 64, 64]} />
          <meshStandardMaterial 
            map={texture}
          />
          {showEdges && <Edges scale={1} threshold={1} color="white" />}
        </mesh>
  
      {/* Optionales Mesh für Clouds oder Atmosphäre */}
      {bodyData.hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[visualRadius * 1.01, 32, 32]} />
          <meshStandardMaterial 
            map={cloudTexture}
            transparent
            opacity={0.6}
            depthWrite={false}
            emissive="grey"
            emissiveMap={cloudTexture}
            emissiveIntensity={0.12}
          />
        </mesh>
      )}
      {bodyData.hasRing && (() => {
        // 1) Erstelle die RingGeometry
        const innerR = visualRadius * 1.1;
        const outerR = visualRadius * 2.5;
        const thetaSegments = 128;
        const ringGeo = new THREE.RingGeometry(innerR, outerR, thetaSegments, 1);

        // 2) Überschreibe deren UVs
        const pos = ringGeo.attributes.position;
        const uv = ringGeo.attributes.uv;
        const v3 = new THREE.Vector3();

        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);

          // (A) Radius in 3D = Abstand zum Ursprung
          const r = v3.length();
          // Normalisieren auf 0..1 (innerRadius => 0, outerRadius => 1)
          const radialFraction = (r - innerR) / (outerR - innerR);

          // (B) Winkel -pi..+pi
          const angle = Math.atan2(v3.y, v3.x);
          // Normalisiere auf [0..1]
          // angle + PI => 0..2PI
          // dann geteilt durch 2PI => 0..1
          const angleFraction = (angle + Math.PI) / (2 * Math.PI);

          // => uv.x = radial (links=inner=0, rechts=außen=1)
          // => uv.y = winkel
          uv.setXY(i, radialFraction, angleFraction);
        }

        // 3) Markiere UV-Buffer als aktualisiert
        uv.needsUpdate = true;

        // 4) Material-Einstellungen
        // Da du horizontal = Radius hast, wollen wir KEINE Wiederholung in X (u)
        // (oder setz RepeatWrapping, wenn du noch weiterkacheln willst).
        // Wahrscheinlich:
        ringTexture.wrapS = THREE.ClampToEdgeWrapping; // radial => 0..1
        ringTexture.wrapT = THREE.RepeatWrapping;      // winkel => kann sich ggf. wiederholen
        ringTexture.repeat.set(1, 1);
        // Falls dein Balken nicht genau 1:1 hoch/breit ist, kannst du hier anpassen
        ringTexture.rotation = 0;  // Erst mal keine Rotation
        ringTexture.center.set(0.5, 0.5);
        ringTexture.needsUpdate = true;

  return (
          <mesh rotation={[Math.PI / 2, 0.2, 0]} geometry={ringGeo}>
        <meshStandardMaterial 
              map={ringTexture}
              side={THREE.DoubleSide}
              transparent={true}
              alphaTest={0.1}
            />
      </mesh>
        );
      })()}
    </group>
  );
  
};

export default CelestialBody;
