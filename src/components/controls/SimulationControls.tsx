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
  const speedOptions = [1, 2, 4, 8, 16, 32, 64];

  return (
    <div className="simulation-controls">
      <button onClick={onToggleRunning}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={onReset}>Reset</button>
      <div className="time-step-control">
        <div className="time-step-wrapper">
          <span className="time-step-label">Simulationsgeschwindigkeit:</span>
          <div className="time-step-buttons">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => onTimeStepChange(speed)}
                className={timeStep === speed ? 'active' : ''}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
