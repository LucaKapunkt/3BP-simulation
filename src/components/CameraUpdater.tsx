import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { CamMode } from './controls/CameraControls';
import type { Vector3D } from '../simulation/DimBerechnung';
import { CELESTIAL_BODIES } from './celestial/CelestialBody';
import { MASS_SCALE, DISTANCE_SCALE } from '../simulation/units';

interface CameraUpdaterProps {
  camMode: CamMode;
  selectedBody: number;
  bodies: { position: Vector3D; velocity: Vector3D; currentMass: number }[];
  resetCam: boolean;
  setResetCam: (value: boolean) => void;
}

const CameraUpdater: React.FC<CameraUpdaterProps> = ({
  camMode,
  selectedBody,
  bodies,
  resetCam,
  setResetCam,
}) => {
  const { camera } = useThree();
  const lastTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  // Neue Refs für die Kamerawinkel und Abstand
  const sphericalRef = useRef<THREE.Spherical>(new THREE.Spherical(10, Math.PI / 4, 0));
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Funktion zur Berechnung des visuellen Radius
  const calculateVisualRadius = (bodyData: typeof CELESTIAL_BODIES[0], currentMass: number): number => {
    const volume = currentMass * MASS_SCALE / bodyData.density;
    const newRadius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
    return newRadius / DISTANCE_SCALE;
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (camMode === '3VP' || camMode === '3VP auto') {
        // Prüfe, ob die Maus sich über einem der Container befindet
        const target = e.target as HTMLElement;
        const isOverControls = target.closest('.controls-container') !== null;
        const isOverBodies = target.closest('.bodies-container') !== null;
        const isOverPresets = target.closest('.preset-container') !== null;

        // Nur aktivieren, wenn die Maus nicht über den Containern ist
        if (!isOverControls && !isOverBodies && !isOverPresets) {
          isDraggingRef.current = true;
          lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMousePosRef.current.x;
        const deltaY = e.clientY - lastMousePosRef.current.y;

        // Horizontale Bewegung nur im 3VP Modus
        if (camMode === '3VP') {
          sphericalRef.current.theta -= deltaX * 0.01;
        }
        
        // Vertikale Bewegung in beiden Modi
        if (camMode === '3VP' || camMode === '3VP auto') {
          sphericalRef.current.phi = Math.max(
            0.1,
            Math.min(Math.PI - 0.1, sphericalRef.current.phi - deltaY * 0.01)
          );
        }

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Neuer Event-Handler für das Mausrad
    const handleWheel = (e: WheelEvent) => {
      if (camMode === '3VP' || camMode === '3VP auto') {
        // Prüfe, ob die Maus sich über dem bodies-container befindet
        const target = e.target as HTMLElement;
        const isOverBodies = target.closest('.bodies-container') !== null;
        
        // Nur zoomen, wenn nicht über dem bodies-container
        if (!isOverBodies) {
          const zoomSpeed = Math.min(0.09,sphericalRef.current.radius ** 2 * 0.0001);
          // Abstand ändern basierend auf Mausrad-Bewegung
          const newRadius = sphericalRef.current.radius + e.deltaY * zoomSpeed;
          
          // Berechne den Minimalabstand basierend auf dem Radius des ausgewählten Körpers
          const selectedBodyData = bodies[selectedBody - 1];
          const celestialBodyData = CELESTIAL_BODIES[selectedBody - 1];
          if (selectedBodyData && celestialBodyData) {
            const bodyRadius = calculateVisualRadius(celestialBodyData, selectedBodyData.currentMass);
            const minDistance = 1.5 * bodyRadius;
            sphericalRef.current.radius = Math.max(minDistance, Math.min(1000, newRadius));
          }
        }
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [camMode, bodies, selectedBody]);

  useFrame(() => {
    if (camMode === 'default') {
      if (resetCam) {
        camera.position.set(0, 10, 15);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        setResetCam(false);
      }
      
      return;
    }

    const targetBody = bodies[selectedBody - 1];
    if (!targetBody) return;

    const targetPos = new THREE.Vector3(
      targetBody.position.x,
      targetBody.position.y,
      targetBody.position.z
    );
    // Speichere den targetPos für späteren Gebrauch
    lastTargetPos.current = targetPos.clone();

    if (camMode === '3VP auto') {
      // Berechne Blickrichtung basierend auf der Geschwindigkeit
      const velocity = new THREE.Vector3(
        targetBody.velocity.x,
        targetBody.velocity.y,
        targetBody.velocity.z
      );
      
      // Normalisiere die Geschwindigkeit für die Blickrichtung
      velocity.normalize();
      const lookAtPos = targetPos.clone().add(velocity);
      
      // Berechne die Kameraposition basierend auf den Kugelkoordinaten
      const cameraOffset = new THREE.Vector3();
      // Setze theta auf die entgegengesetzte Richtung (+ Math.PI), um hinter dem Körper zu sein
      sphericalRef.current.theta = Math.atan2(velocity.x, velocity.z) + Math.PI;
      cameraOffset.setFromSpherical(sphericalRef.current);
      
      camera.position.copy(targetPos).add(cameraOffset);
      camera.lookAt(lookAtPos);
    } 
    else if (camMode === '3VP') {
      // Berechne die Kameraposition basierend auf den Kugelkoordinaten
      const cameraOffset = new THREE.Vector3();
      cameraOffset.setFromSpherical(sphericalRef.current);
      
      camera.position.copy(targetPos).add(cameraOffset);
      camera.lookAt(targetPos);
    }

    camera.updateProjectionMatrix();
  });

  // Log beim Moduswechsel
  useEffect(() => {
    if (camMode === 'default' && lastTargetPos.current) {
      // Behalte die aktuelle Position bei, aber schaue auf den letzten bekannten targetPos
      camera.lookAt(lastTargetPos.current);
      camera.updateProjectionMatrix();
    }
  }, [camMode, camera]);

  return null;
};

export default CameraUpdater; 