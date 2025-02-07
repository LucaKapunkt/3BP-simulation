/**
 * Steuerungskomponente für die Simulationsparameter
 * 
 * Bietet Benutzerkontrollen für:
 * - Start/Pause der Simulation
 * - Reset auf Ausgangszustand
 * - Anpassung der Zeitschrittgröße
 * 
 * Die Komponente ermöglicht die interaktive Steuerung des Simulationsablaufs.
 */

import React from 'react';

interface SimulationControlsProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
  timeStep: number;
  onTimeStepChange: (value: number) => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning,
  onToggleRunning,
  onReset,
  timeStep,
  onTimeStepChange,
}) => {
  return (
    <div className="simulation-controls">
      <button onClick={onToggleRunning}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={onReset}>Reset</button>
      <div className="time-step-control">
        <label>Geschwindigkeit: {timeStep}x</label>
        <input
          type="range"
          min="1"
          max="75"
          step="1"
          value={timeStep}
          onChange={(e) => onTimeStepChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SimulationControls;
