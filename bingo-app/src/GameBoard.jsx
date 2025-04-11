import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BingoCard from './bingo-card';
import './index.css';

const fetchBingoCard = async (gameCode, setCards, setMessage) => {
  try {
    const response = await fetch(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`);
    const data = await response.json();

    if (!data || !data.card) {
      setMessage('Invalid game code or no cards available.');
      return;
    }

    const newCard = {
      id: Date.now(),
      card: data.card,  // Ensure we use the correct card structure (B, I, N, G, O)
      token: data.playcard_token,
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setMessage('New card added!');
  } catch (error) {
    console.error('Error fetching bingo card:', error);
    setMessage(`Error fetching bingo card: ${error.message}`);
  }
};

const checkWin = async (playcardToken, setMessage) => {
  try {
    const response = await fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`);
    const result = await response.text();
    if (result === '1') {
      setMessage(`Card ${playcardToken} is a WINNER! 🎉`);
    } else {
      setMessage(`Card ${playcardToken} is not a winner yet.`);
    }
  } catch (error) {
    console.error('Error checking win:', error);
    setMessage(`Error checking win: ${error.message}`);
  }
};

const GameBoard = () => {
  const { gameCode } = useParams(); // Get the game code from the URL params
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState('');

  const addCard = async () => {
    await fetchBingoCard(gameCode, setCards, setMessage);
  };

  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="game-board-container">
      <h1 className="game-board-title">Game Code: {gameCode}</h1>

      <div className="game-actions">
        <button className="btn add-btn" onClick={addCard}>
          Add New Card
        </button>
      </div>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <div className="cards-container">
        {cards.length === 0 && <div>No cards available yet.</div>}
        {cards.map(card => (
          <BingoCard
            key={card.id}
            card={card.card} // Pass the card structure (B, I, N, G, O)
            onCheckWin={() => checkWin(card.token, setMessage)} // Check win for this card
            onRemove={() => removeCard(card.id)} // Remove card
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
