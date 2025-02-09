import React from 'react';

interface TimeDisplayProps {
  days: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ days }) => {
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;

  return (
    <div className="time-display">
      <div>Simulationszeit</div>
      {years > 0 && <div>{years} {years === 1 ? 'Jahr' : 'Jahre'}</div>}
      <div>{remainingDays} Tage</div>
    </div>
  );
};

export default TimeDisplay; 