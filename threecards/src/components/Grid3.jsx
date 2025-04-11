//Grid3.jsx
import React from 'react';

const Grid3 = ({ drawCards, resetGame }) => {
  return (
    <div className="grid-3">
      <button className="blue-button" onClick={drawCards}>
        Draw Cards
      </button>
    </div>
  );
};

export default Grid3;