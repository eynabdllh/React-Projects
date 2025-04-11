import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { Button, Card, CardContent, Typography, Paper } from '@mui/material';

const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFE0B2', '#D1C4E9'];

export const BingoCard = ({ card, onRemove }) => {
  const [isWinning, setIsWinning] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  const checkWin = async () => {
    try {
      const response = await axios.get(
        `http://www.hyeumine.com/checkwin.php?playcard_token=${card.playcard_token}`
      );
      setIsWinning(response.data === 1);
    } catch (error) {
      console.error('Error checking Bingo win via API:', error);
      setIsWinning(false);
    }
  };

  const modifiedGrid = card.grid.map((row) => [...row]);
  modifiedGrid[2][2] = 'FREE';

  return (
    <Card
      style={{
        backgroundColor,
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        marginBottom: '30px',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <CardContent>
        <Grid container spacing={2} justifyContent="center">
          {['B', 'I', 'N', 'G', 'O'].map((letter) => (
            <Grid item xs={2.4} key={letter}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '1.6rem', 
                textAlign: 'center', 
                marginBottom: '10px', 
                color: '#2196f3', 
                letterSpacing: '5px' 
              }}>
                {letter}
              </div>
            </Grid>
          ))}
        </Grid>
        {modifiedGrid.map((row, rowIndex) => (
          <Grid container key={rowIndex} justifyContent="center" spacing={1}>
            {row.map((value, cellIndex) => (
              <Grid item xs={2.4} key={cellIndex}>
                <Paper
                  elevation={2}
                  style={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '3px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: value === 'FREE' ? '#FFEB3B' : '#e3f2fd',
                  }}
                >
                  {value}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
        <Typography
          variant="subtitle2"
          align="center"
          gutterBottom
          style={{ fontWeight: 'bold', marginTop: '10px' }}
        >
          Token: {card.playcard_token}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <Button variant="contained" color="primary" onClick={checkWin} style={{ flex: 1, marginRight: '5px' }}>
            Check Win
          </Button>
          <Button variant="contained" color="error" onClick={onRemove} style={{ flex: 1, marginLeft: '5px' }}>
            Remove Card
          </Button>
        </div>
        <Typography
          align="center"
          style={{
            marginTop: '15px',
            fontWeight: 'bold',
            color: isWinning ? 'green' : 'red',
            minHeight: '20px',
          }}
        >
          {isWinning !== null && (isWinning ? 'You Win!' : 'Not a Winning Card')}
        </Typography>
      </CardContent>
    </Card>
  );
};