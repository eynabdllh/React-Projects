import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const BingoGame = () => {
  const [gameCode, setGameCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGameCodeSubmit = () => {
    if (!gameCode) {
      setMessage('Please enter a game code.');
      return;
    }

    // Make a basic check if the game code looks valid
    fetch(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`)
      .then(response => response.json())
      .then(data => {
        if (data === 0) {
          setMessage('Invalid game code. Please try again.');
        } else {
          navigate(`/game/${gameCode}`);  // Navigate to the GameBoard component with the game code
        }
      })
      .catch(err => {
        setMessage('Error: Unable to fetch the game card. Please try again later.');
      });
  };

  return (
    <div className="bingo-container">
      <h1 className="bingo-title">E-Bingo Game</h1>

      <div className="game-controls">
        <input
          type="text"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          placeholder="Enter Game Code"
          className="game-input"
        />
        <button className="btn add-btn" onClick={handleGameCodeSubmit}>
          Start Game
        </button>
      </div>

      {message && (
        <div className="message">
          {message}
        </div>
      )}
    </div>
  );
};

export default BingoGame;
