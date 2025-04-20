import React from 'react';

const ClueBoard = ({ clues, connections }) => {
  return (
    <div className="clue-board">
      <div className="board-header">
        <h3>Evidence Board</h3>
      </div>
      <div className="clues-container">
        {clues.map((clue, index) => (
          <div key={index} className="clue-card">
            <img src={clue.image} alt={clue.description} />
            <p>{clue.description}</p>
          </div>
        ))}
        <svg className="connections-overlay">
          {connections.map((connection, index) => (
            <line
              key={index}
              x1={connection.start.x}
              y1={connection.start.y}
              x2={connection.end.x}
              y2={connection.end.y}
              className="connection-line"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ClueBoard;
