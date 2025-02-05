/**
 * Steuerungskomponente für die Kameraeinstellungen
 * 
 * Ermöglicht die Anpassung verschiedener Kameraparameter:
 * - Kameraposition (Frei, First-Person-View, Third-Person-View)
 * - Fokuspunkt der Kamera (Körper, Bewegungsrichtung, Ursprung)
 * - Auswahl des zu verfolgenden Himmelskörpers
 * 
 * Die verfügbaren Optionen passen sich dynamisch an die gewählte Kameraposition an.
 */

import React, { useState, useEffect } from 'react';

const CameraControls: React.FC = () => {
  const [camPos, setCamPos] = useState<'Frei' | 'FPV' | '3PV'>('Frei');
  const [camFokus, setCamFokus] = useState<'Ohne' | 'Körper 1' | 'Körper 2' | 'Körper 3' | 'Bewegungsrichtung' | 'Ursprung'>('Ursprung');
  const [camKoerper, setCamKoerper] = useState<1 | 2 | 3>(1);

  const handleFokusChange = () => {
    setCamFokus(prev => {
      if (camPos === 'FPV' || camPos === '3PV') {
        return prev === 'Ohne' ? 'Bewegungsrichtung' : 'Ohne';
      } else {
        switch(prev) {
          case 'Ohne': return 'Körper 1';
          case 'Körper 1': return 'Körper 2';
          case 'Körper 2': return 'Körper 3';
          case 'Körper 3': return 'Ursprung';
          case 'Ursprung': return 'Ohne';
          default: return 'Ohne';
        }
      }
    });
  };

  useEffect(() => {
    if (camPos === 'Frei') {
      setCamFokus('Ohne');
    } else if (camPos === 'FPV' || camPos === '3PV') {
      setCamFokus('Bewegungsrichtung');
    }
  }, [camPos]);

  return (
    <div className="camera-controls">
      <button 
          onClick={() => {
            setCamPos(prev => {
              if (prev === 'Frei') return 'FPV';
              if (prev === 'FPV') return '3PV';
              return 'Frei';
            });
          }}
        >
          Position: {camPos}
        </button>
        <button 
          onClick={() => setCamKoerper(prev => prev === 3 ? 1 : (prev + 1) as 2 | 3)}
          className={camPos === 'Frei' ? 'inactive' : ''}
          disabled={camPos === 'Frei'}
        >
          Körper {camKoerper}
        </button>
        <button onClick={handleFokusChange}>
          Fokus: {camFokus}
        </button>
    </div>
  );
};

export default CameraControls;
