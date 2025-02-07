// src/components/controls/CameraControls.tsx
import React from 'react';

export type CamMode =
  | 'default'
  | 'default 1'
  | 'default 2'
  | 'default 3'
  | 'FVP 1'
  | 'FVP 2'
  | 'FVP 3'
  | 'FVP 1 auto'
  | 'FVP 2 auto'
  | 'FVP 3 auto'
  | '3VP 1'
  | '3VP 2'
  | '3VP 3';

interface CameraControlsProps {
  camMode: CamMode;
  setCamMode: React.Dispatch<React.SetStateAction<CamMode>>;
}

const CameraControls: React.FC<CameraControlsProps> = ({ camMode, setCamMode }) => {
  // Hilfsfunktion zur Extraktion des Körperindexes (0-2)
  const getBodyIndex = (): number => {
    const parts = camMode.split(' ');
    return parts.length >= 2 ? parseInt(parts[1], 10) - 1 : 0;
  };

  // Handler für den Positions-Button
  const handlePositionClick = () => {
    const bodyIdx = getBodyIndex() + 1; // Körpernummer (1-3)
    if (camMode.startsWith('default')) {
      // Wechsel zu FVP mit auto-Fokus
      setCamMode(`FVP ${bodyIdx} auto` as CamMode);
    } else if (camMode.startsWith('FVP')) {
      // Wechsel zu 3VP
      setCamMode(`3VP ${bodyIdx}` as CamMode);
    } else {
      // Wechsel zurück zu default
      setCamMode('default');
    }
  };

  // Handler für den Körper-Button (nur aktiv in FVP und 3VP)
  const handleBodyClick = () => {
    if (camMode.startsWith('default')) return;
    const current = getBodyIndex();
    const next = (current + 1) % 3; // Zyklisch 0,1,2
    if (camMode.startsWith('FVP')) {
      setCamMode((`FVP ${next + 1}${camMode.includes('auto') ? ' auto' : ''}`) as CamMode);
    } else if (camMode.startsWith('3VP')) {
      setCamMode(`3VP ${next + 1}` as CamMode);
    }
  };

  // Handler für den Fokus-Button
  const handleFokusClick = () => {
    if (camMode.startsWith('3VP')) return; // Fokus-Button deaktiviert in 3VP
    if (camMode.startsWith('FVP')) {
      // Toggle in FVP zwischen auto und non-auto
      const parts = camMode.split(' ');
      if (camMode.includes('auto')) {
        setCamMode(`FVP ${parts[1]}` as CamMode);
      } else {
        setCamMode(`FVP ${parts[1]} auto` as CamMode);
      }
    } else if (camMode.startsWith('default')) {
      // Zyklischer Wechsel in default: "default" -> "default 1" -> "default 2" -> "default 3" -> "default"
      if (camMode === 'default') {
        setCamMode('default 1');
      } else if (camMode === 'default 1') {
        setCamMode('default 2');
      } else if (camMode === 'default 2') {
        setCamMode('default 3');
      } else {
        setCamMode('default');
      }
    }
  };

  return (
    <div className="camera-controls">
      <button onClick={handlePositionClick}>
        Position: {camMode.startsWith('default')
          ? 'Frei'
          : camMode.startsWith('FVP')
          ? 'FVP'
          : '3VP'}
      </button>
      <button
        onClick={handleBodyClick}
        disabled={camMode.startsWith('default')}
        className={camMode.startsWith('default') ? 'inactive' : ''}
      >
        Körper: {camMode.startsWith('default') ? '-' : getBodyIndex() + 1}
      </button>
      <button
        onClick={handleFokusClick}
        disabled={camMode.startsWith('3VP')}
        className={camMode.startsWith('3VP') ? 'inactive' : ''}
      >
        Fokus:{' '}
        {camMode.startsWith('FVP')
          ? camMode.includes('auto')
            ? 'Bewegungsrichtung'
            : 'Ohne'
          : camMode.startsWith('default')
          ? camMode === 'default'
            ? 'Ohne'
            : camMode === 'default 1'
            ? 'Körper 1'
            : camMode === 'default 2'
            ? 'Körper 2'
            : 'Körper 3'
          : ''}
      </button>
    </div>
  );
};

export default CameraControls;
