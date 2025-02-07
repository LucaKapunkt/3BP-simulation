// src/components/controls/CameraControls.tsx
import React from 'react';

export type CamMode = 'default' | 'FVP' | '3VP';

interface CameraControlsProps {
  camMode: CamMode;
  setCamMode: React.Dispatch<React.SetStateAction<CamMode>>;
  selectedBody: number;
  setSelectedBody: React.Dispatch<React.SetStateAction<number>>;
}

const CameraControls: React.FC<CameraControlsProps> = ({ 
  camMode, 
  setCamMode, 
  selectedBody, 
  setSelectedBody 
}) => {
  // Funktion zum Ermitteln des Körpernamens
  const getBodyName = (index: number): string => {
    switch(index) {
      case 1:
        return 'Erde';
      case 2:
        return 'Mars';
      case 3:
        return 'Jupiter';
      default:
        return '-';
    }
  };

  // Handler für den Kameramodus-Button
  const handleModeClick = () => {
    if (camMode === 'default') {
      setCamMode('FVP');
    } else if (camMode === 'FVP') {
      setCamMode('3VP');
    } else {
      setCamMode('default');
    }
  };

  // Handler für den Körper-Button
  const handleBodyClick = () => {
    if (camMode !== 'default') {
      setSelectedBody((prev) => (prev % 3) + 1);
    }
  };

  return (
    <div className="camera-controls">
      <button onClick={handleModeClick}>
        Kameramodus: {camMode === 'default' ? 'Frei' : camMode}
      </button>
      <button
        onClick={handleBodyClick}
        disabled={camMode === 'default'}
        className={camMode === 'default' ? 'inactive' : ''}
      >
        Körper: {camMode === 'default' ? '-' : getBodyName(selectedBody)}
      </button>
    </div>
  );
};

export default CameraControls;
