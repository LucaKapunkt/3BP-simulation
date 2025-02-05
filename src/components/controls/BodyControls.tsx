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
  bodyName: string;
  isRunning: boolean;
}

const BodyControls: React.FC<BodyControlsProps> = ({ body, onChange, bodyName, isRunning }) => {
  return (
    <div className="body-controls">
      <h3>{bodyName}</h3>
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
          value={isRunning ? body.mass.toFixed(2) : body.mass}
          onChange={(e) => onChange({ ...body, mass: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
          readOnly={isRunning}
        />
      </div>
    </div>
  );
};

export default BodyControls;
