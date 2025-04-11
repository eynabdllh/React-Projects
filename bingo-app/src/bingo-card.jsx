import React from 'react';
import './index.css';

const BingoCard = ({ card, onCheckWin, onRemove }) => {
  const columns = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="bingo-card">
      <div className="bingo-grid">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="bingo-column">
            {card[col].map((number, rowIdx) => {
              const isFreeSpace = col === 'N' && rowIdx === 2;
              return (
                <div
                  key={`${col}-${rowIdx}`}
                  className={`bingo-cell ${isFreeSpace ? 'free-space' : ''}`}
                >
                  {isFreeSpace ? 'FREE' : number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="card-actions">
        <button className="btn check-btn" onClick={onCheckWin}>Check Win</button>
        <button className="btn remove-btn" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default BingoCard;
