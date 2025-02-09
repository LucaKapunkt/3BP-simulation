/**
 * Komponente zur Auswahl vordefinierter Simulationszustände
 * 
 * Bietet eine Auswahl verschiedener interessanter Ausgangskonfigurationen:
 * - Verschiedene Startpositionen und -geschwindigkeiten
 * - Spezielle Konstellationen wie Lagrange-Punkte
 * - Chaotische und stabile Konfigurationen
 */

import React from 'react';
import { presets, PresetConfig } from '../../data/initialConditions';

interface PresetSelectionProps {
  onSelect: (config: PresetConfig) => void;
}

const PresetSelection: React.FC<PresetSelectionProps> = ({ onSelect }) => {
  return (
    <div className="preset-selection">
      {Object.entries(presets).map(([name, preset]) => (
        <button
          key={name}
          onClick={() => onSelect(preset)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default PresetSelection;
