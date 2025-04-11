// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Grid1 from './components/Grid1';
import Grid2 from './components/Grid2';
import Grid3 from './components/Grid3';

// Define suits and ranks for a standard 52-card deck
const suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// Function to create a full deck of cards
const createDeck = () => {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, value: rank });
    }
  }
  return deck;
};

// Function to shuffle the deck
const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

// Function to check for doubles or triples in a set of cards
const checkForSpecialPoints = (cards) => {
  const counts = {};
  cards.forEach(card => counts[card.value] = (counts[card.value] || 0) + 1);

  const hasDouble = Object.values(counts).includes(2);
  const hasTriple = Object.values(counts).includes(3);

  if (hasTriple) {
    return 1; // Triple cards get 1 point
  } else if (hasDouble) {
    return 1; // Double cards get 1 point
  } else {
    return 0; // No extra points
  }
};

const App = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (currentCardIndex > 0 && currentCardIndex <= 3) {
      const timer = setTimeout(() => {
        setPlayer1Cards(prev => [...prev, deck[currentCardIndex - 1]]);
        setPlayer2Cards(prev => [...prev, deck[currentCardIndex + 2]]);
        setCurrentCardIndex(prevIndex => prevIndex + 1);
      }, 1000); // 1 second delay between each card

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [currentCardIndex]);

  const drawCards = () => {
    // Only allow drawing cards if no player has won yet
    if (winner) return;
  
    // Shuffle the deck before dealing new cards
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  
    // Reset the cards and start dealing from the reshuffled deck
    setPlayer1Cards([]);
    setPlayer2Cards([]);
    setCurrentCardIndex(1);
  };
  

  useEffect(() => {
    if (currentCardIndex === 4) {
      // After all 3 cards are drawn for both players, calculate the points

      const player1SpecialPoints = checkForSpecialPoints(player1Cards);
      const player2SpecialPoints = checkForSpecialPoints(player2Cards);

      let player1Points = 0;
      let player2Points = 0;

      if (player1SpecialPoints > 0) {
        player1Points = 1;
      } else if (player2SpecialPoints > 0) {
        player2Points = 1;
      } else {
        const player1HighestCard = Math.max(...player1Cards.map(card => card.value));
        const player2HighestCard = Math.max(...player2Cards.map(card => card.value));

        if (player1HighestCard > player2HighestCard) {
          player1Points = 1;
        } else if (player2HighestCard > player1HighestCard) {
          player2Points = 1;
        } 
      }

      setPlayer1Score(prevScore => prevScore + player1Points);
      setPlayer2Score(prevScore => prevScore + player2Points);

      if (player1Score + player1Points >= 5) {
        setWinner('Player 1');
      } else if (player2Score + player2Points >= 5) {
        setWinner('Player 2');
      }
    }
  }, [currentCardIndex, player1Cards, player2Cards]);


  return (
    <div className="background-image">
      <div className="container">
        <Grid1 winner={winner} />
        <Grid2
          player1Cards={player1Cards}
          player2Cards={player2Cards}
          player1Score={player1Score}
          player2Score={player2Score}
          currentCardIndex={currentCardIndex} // Pass the current card index
          winner={winner}
        />
        <Grid3 drawCards={drawCards} winner={winner} />
      </div>
    </div>
  );
};

export default App;
