/**
 * Wiederverwendbare Komponente für die Eingabe von 3D-Vektoren
 * 
 * Stellt ein Eingabefeld für dreidimensionale Vektoren bereit:
 * - Separate Eingabefelder für X, Y und Z Koordinaten
 * - Formatierung der Werte während der Simulation
 * - Behandlung von Sonderfällen bei der Zahleneingabe
 * - Deaktivierung der Eingabe während der laufenden Simulation
 */

import React from 'react';
import { Vector3D } from '../../simulation/Berechnung';

interface VectorInputProps {
  label: string;
  value: Vector3D;
  onChange: (newValue: Vector3D) => void;
  isRunning: boolean;
}

const VectorInput: React.FC<VectorInputProps> = ({ label, value, onChange, isRunning }) => {
  const formatValue = (val: number) => {
    // Wenn der Wert eine ganze Zahl ist, zeige keine Nachkommastellen
    if (Number.isInteger(val)) {
      return val.toString();
    }
    // Ansonsten zeige 2 Nachkommastellen
    return val.toFixed(2);
  };

  return (
    <div className="vector-input">
      <label>{label}</label>
      <div className={`vector-fields ${isRunning ? 'inactive' : ''}`}>
        <input
          type="number"
          value={formatValue(value.x)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
              val = val.substring(1);
            }
            onChange({ ...value, x: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="X"
          readOnly={isRunning}
        />
        <input
          type="number"
          value={formatValue(value.y)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
              val = val.substring(1);
            }
            onChange({ ...value, y: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="Y"
          readOnly={isRunning}
        />
        <input
          type="number"
          value={formatValue(value.z)}
          onChange={(e) => {
            let val = e.target.value;
            if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
              val = val.substring(1);
            }
            onChange({ ...value, z: val === '' ? 0 : parseFloat(val) });
          }}
          placeholder="Z"
          readOnly={isRunning}
        />
      </div>
    </div>
  );
};

export default VectorInput;
