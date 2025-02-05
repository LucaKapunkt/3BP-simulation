/**
 * Steuerungskomponente für die Visualisierungsoptionen
 * 
 * Ermöglicht das Ein- und Ausschalten verschiedener visueller Elemente:
 * - Kanten der Himmelskörper
 * - Bewegungsbahnen der Körper
 * - Hilfsgitter im 3D-Raum
 * 
 * Bietet eine intuitive Benutzeroberfläche zur Anpassung der Darstellung.
 */

import React from 'react';

interface VisualizationControlsProps {
  showEdges: boolean;
  onToggleEdges: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showBahnen: boolean;
  onToggleBahnen: () => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  showEdges,
  onToggleEdges,
  showGrid,
  onToggleGrid,
  showBahnen,
  onToggleBahnen,
}) => {
  return (
    <div className="visualization-controls">
      <button onClick={onToggleEdges} className={showEdges ? 'active' : 'inactive'}>
        Edges
      </button>
      <button onClick={onToggleBahnen} className={showBahnen ? 'active' : 'inactive'}>
        Bahnen
      </button>
      <button onClick={onToggleGrid} className={showGrid ? 'active' : 'inactive'}>
        Grid
      </button>
    </div>
  );
};

export default VisualizationControls;
