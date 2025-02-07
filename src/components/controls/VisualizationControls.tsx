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
  showStars: boolean;
  onToggleStars: () => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  showEdges,
  onToggleEdges,
  showGrid,
  onToggleGrid,
  showBahnen,
  onToggleBahnen,
  showStars,
  onToggleStars
}) => {
  return (
    <div className="visualization-controls">
      <button
        className={showEdges ? 'active' : 'inactive'}
        onClick={onToggleEdges}
      >
        Kanten
      </button>
      <button
        className={showGrid ? 'active' : 'inactive'}
        onClick={onToggleGrid}
      >
        Gitter
      </button>
      <button
        className={showBahnen ? 'active' : 'inactive'}
        onClick={onToggleBahnen}
      >
        Bahnen
      </button>
      <button
        className={showStars ? 'active' : 'inactive'}
        onClick={onToggleStars}
      >
        Sterne
      </button>
    </div>
  );
};

export default VisualizationControls;
