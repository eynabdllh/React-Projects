//Grid2.jsx
import React from 'react';

const renderCards = (cards, defaultBackImage, currentCardIndex, player) => {
  return [0, 1, 2].map((_, index) => {
    let revealCardIndex;
    
    // Player 1 reveals cards at indices 0, 1, 2
    // Player 2 reveals cards at indices 3, 4, 5
    if (player === 'Player 1') {
      revealCardIndex = index + 1; // Reveal indices 1, 2, 3
    } else {
      revealCardIndex = index + 2; // Reveal indices 4, 5, 6
    }

    if (currentCardIndex >= revealCardIndex && cards[index]) {
      // Show actual card if its index is within currentCardIndex and the card exists
      const card = cards[index];
      return (
        <img
          key={index}
          src={`/cards/${card.suit} (${card.rank}).png`} // Adjust path to your card images
          alt={`${card.rank} of ${card.suit}`}
          style={{ width: '200px', margin: '30px 3px' }}
        />
      );
    } else {
      // Show the card back if the card hasn't been revealed yet
      return (
        <img
          key={index}
          src={defaultBackImage}
          alt="Card Back"
          style={{ width: '200px', margin: '30px 3px' }}
        />
      );
    }
  });
};


const Grid2 = ({ player1Cards, player2Cards, player1Score, player2Score, winner, currentCardIndex }) => {
  // Determine if each player is the winner
  const isPlayer1Winner = winner === 'Player 1';
  const isPlayer2Winner = winner === 'Player 2';

  // Define the path to the card back image
  const cardBackImage = 'cardsBackImg.png'; // Adjust the path for your card back image

  return (
    <div className="grid-2">
      <div className={`sub-grid1`}>
        <p>Player 1</p>
        <div>{renderCards(player1Cards, cardBackImage, currentCardIndex, 'Player 1')}</div>
        <p>Score: {player1Score}</p>
        {isPlayer1Winner && <div>Winner!</div>}
      </div>
      <div className={`sub-grid2`}>
        <p>Player 2</p>
        <div>{renderCards(player2Cards, cardBackImage, currentCardIndex, 'Player 2')}</div>
        <p>Score: {player2Score}</p>
        {isPlayer2Winner && <div>Winner!</div>}
      </div>
    </div>
  );
};



export default Grid2;
