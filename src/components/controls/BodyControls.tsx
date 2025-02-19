/**
 * Steuerungskomponente für die Parameter eines einzelnen Himmelskörpers
 * 
 * Ermöglicht die Bearbeitung aller relevanten Eigenschaften eines Himmelskörpers:
 * - Position im 3D-Raum
 * - Geschwindigkeitsvektor
 * - Masse des Körpers
 * 
 * Die Eingaben werden während der laufenden Simulation deaktiviert.
 */

import React from 'react';
import VectorInput from './VectorInput';
import { CelestialBodyData } from '../../simulation/Berechnung';

interface BodyControlsProps {
  body: CelestialBodyData;
  onChange: (newBody: CelestialBodyData) => void;
  isRunning: boolean;
  index: number;
}

const BodyControls: React.FC<BodyControlsProps> = ({ body, onChange, index, isRunning }) => {
  // Funktion zum Ermitteln des Körpernamens
  const getBodyName = (index: number): string => {
    switch(index) {
      case 0:
        return 'Erde';
      case 1:
        return 'Mars';
      case 2:
        return 'Jupiter';
      default:
        return `Körper ${index + 1}`;
    }
  };

  return (
    <div className="body-controls">
      <h3>{getBodyName(index)}</h3>
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
          min="1"
          value={Number.isInteger(body.mass / 1000) ? body.mass / 1000 : (body.mass / 1000).toFixed(1)}
          onChange={(e) => {
            const inputValue = e.target.value === '' ? 1 : Math.max(1, parseFloat(e.target.value));
            onChange({ ...body, mass: inputValue * 1000 });
          }}
        />
      </div>
    </div>
  );
};

export default BodyControls;
