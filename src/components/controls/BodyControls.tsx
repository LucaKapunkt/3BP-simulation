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
import { CelestialBodyData } from '../../simulation/DimBerechnung';
import { CELESTIAL_BODIES } from '../celestial/CelestialBody';

interface BodyControlsProps {
  body: CelestialBodyData;
  onChange: (newBody: CelestialBodyData) => void;
  isRunning: boolean;
  celestialBodyIndex: number;
}

const BodyControls: React.FC<BodyControlsProps> = ({ body, onChange, isRunning, celestialBodyIndex }) => {
  const celestialBody = CELESTIAL_BODIES[celestialBodyIndex];
  const bodyName = celestialBody ? celestialBody.name : 'Unbekannter Körper';

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
          min="1"
          value={body.currentMass}
          onChange={(e) => {
            const inputValue = e.target.value === '' ? 1 : Math.max(1, parseFloat(e.target.value));
            onChange({ ...body, currentMass: inputValue });
          }}
        />
      </div>
    </div>
  );
};

export default BodyControls;
