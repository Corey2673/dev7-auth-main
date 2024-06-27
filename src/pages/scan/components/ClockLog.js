import React from 'react';

const ClockLog = ({ logs }) => {
  return (
    <div className="clock-log">
      <h2>Clock Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.type} at {log.time.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClockLog;
