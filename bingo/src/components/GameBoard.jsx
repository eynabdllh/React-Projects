import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { BingoCard } from './BingoCard';
import { Button, Typography } from '@mui/material';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const gameCode = 'HEelhJos';

  const fetchBingoCard = async () => {
    try {
      const response = await axios.get(
        `http://www.hyeumine.com/getcard.php?bcode=${gameCode}`
      );
      if (response.data && response.data.card) {
        const { B, I, N, G, O } = response.data.card;
        const grid = Array.from({ length: 5 }, (_, i) => [B[i], I[i], N[i], G[i], O[i]]);
        const newCard = { playcard_token: response.data.playcard_token, grid };
        setCards((prevCards) => [...prevCards, newCard]);
      } else {
        alert('Invalid card data received.');
      }
    } catch (error) {
      alert('Failed to fetch Bingo card.');
    }
  };

  const removeCard = (index) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        padding: '50px',
        backgroundColor: '#fafafa',
        borderRadius: '15px',
        maxWidth: '1200px',
        margin: '50px auto',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Game Code: {gameCode}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchBingoCard}
        style={{ marginBottom: '20px' }}
      >
        Get New Bingo Card
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BingoCard card={card} onRemove={() => removeCard(index)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GameBoard;