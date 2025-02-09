// src/components/controls/CameraControls.tsx
import React from 'react';
import { CELESTIAL_BODIES } from '../celestial/CelestialBody';

export type CamMode = 'default' | '3VP auto' | '3VP';

interface CameraControlsProps {
  camMode: CamMode;
  setCamMode: React.Dispatch<React.SetStateAction<CamMode>>;
  selectedBody: number;
  setSelectedBody: React.Dispatch<React.SetStateAction<number>>;
  usedBodies: number[];
}

const CameraControls: React.FC<CameraControlsProps> = ({ 
  camMode, 
  setCamMode, 
  selectedBody, 
  setSelectedBody,
  usedBodies
}) => {
  // Funktion zum Ermitteln des Körpernamens
  const getBodyName = (index: number): string => {
    const celestialBody = CELESTIAL_BODIES[usedBodies[index - 1]];
    return celestialBody ? celestialBody.name : '-';
  };

  // Handler für den Kameramodus-Button
  const handleModeClick = () => {
    if (camMode === 'default') {
      setCamMode('3VP auto');
    } else if (camMode === '3VP auto') {
      setCamMode('3VP');
    } else {
      setCamMode('default');
    }
  };

  // Handler für den Körper-Button
  const handleBodyClick = () => {
    if (camMode !== 'default') {
      setSelectedBody((prev) => (prev % usedBodies.length) + 1);
    }
  };

  return (
    <div className="camera-controls">
      <div className="camera-mode-control">
        <span className="control-label">Kameramodus:</span>
        <button onClick={handleModeClick}>
          {camMode === 'default' ? 'Frei' : camMode}
        </button>
      </div>
      <div className="body-select-control">
        <span className="control-label">Körper:</span>
        <button
          onClick={handleBodyClick}
          disabled={camMode === 'default'}
          className={camMode === 'default' ? 'inactive' : ''}
        >
          {camMode === 'default' ? '-' : getBodyName(selectedBody)}
        </button>
      </div>
    </div>
  );
};

export default CameraControls;
