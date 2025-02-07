// src/components/CameraUpdater.tsx
import { useThree, useFrame } from '@react-three/fiber';
import React, { useCallback, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import type { Vector3D } from '../simulation/Berechnung';
import type { CamMode } from './controls/CameraControls';

export interface CameraUpdaterHandle {
  resetCamera: () => void;
}

interface CameraUpdaterProps {
  camMode: CamMode;
  bodies: { position: Vector3D; velocity: Vector3D }[];
}

const computeCameraTransform = (camMode: CamMode, bodies: { position: Vector3D; velocity: Vector3D }[]): { position: THREE.Vector3, lookAt: THREE.Vector3 } | null => {
  // Für den reinen freien Modus ("default") soll nichts berechnet werden.
  if (camMode === 'default') return null;

  // Bestimme den Zielkörperindex aus dem Zustand (z. B. "FVP 1 auto" → Index 0)
  const parts = camMode.split(' ');
  const bodyIndex = parts.length >= 2 ? parseInt(parts[1], 10) - 1 : 0;
  const target = bodies[bodyIndex];
  if (!target) return null;
  const pos = new THREE.Vector3(target.position.x, target.position.y, target.position.z);

  if (camMode.startsWith('FVP')) {
    if (camMode.includes('auto')) {
      // Auto-Fokus: Blickrichtung in Bewegungsrichtung
      const { x: vx, y: vy, z: vz } = target.velocity;
      const len = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
      const lookAt = pos.clone().add(new THREE.Vector3(vx / len, vy / len, vz / len));
      return { position: pos, lookAt };
    } else {
      // FVP ohne Auto: Einfach einen kleinen Offset für den LookAt verwenden
      const lookAt = pos.clone().add(new THREE.Vector3(1, 0, 0));
      return { position: pos, lookAt };
    }
  } else if (camMode.startsWith('3VP')) {
    // 3VP: Fester Offset relativ zum Zielkörper
    const offset = new THREE.Vector3(0, 5, -10);
    const newPos = pos.clone().add(offset);
    return { position: newPos, lookAt: pos };
  }
  return null;
};

const CameraUpdater = forwardRef<CameraUpdaterHandle, CameraUpdaterProps>(({ camMode, bodies }, ref) => {
  const { camera } = useThree();

  const resetCamera = useCallback(() => {
    const defaultPos = new THREE.Vector3(0, 15, 15);
    camera.position.copy(defaultPos);
    camera.updateProjectionMatrix();
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }, [camera]);

  useImperativeHandle(ref, () => ({
    resetCamera
  }), [resetCamera]);

  useFrame(() => {
    // WICHTIG: Wenn der Zustand exakt "default" (Frei) ist, soll die Kamera NICHT neu gesetzt werden.
    if (camMode === 'default') return;

    const transform = computeCameraTransform(camMode, bodies);
    if (transform) {
      camera.position.copy(transform.position);
      camera.lookAt(transform.lookAt);
      camera.updateMatrixWorld();
    }
  });

  return null;
});

export default CameraUpdater;
