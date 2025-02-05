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
  onTimeStepChange: (newTimeStep: number) => void;
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
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onToggleRunning}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
      <div className="time-step-control">
        <label>Zeitschritt:</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={timeStep}
          onChange={(e) => onTimeStepChange(parseFloat(e.target.value))}
        />
        <span>{timeStep.toFixed(3)}</span>
      </div>
    </div>
  );
};

export default SimulationControls;
