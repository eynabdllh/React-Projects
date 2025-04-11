import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import GridCell from './GridCell';

const ColorGrid = ({ predefinedColors, sequenceColors }) => {
  const [cellColors, setCellColors] = useState(Array(9).fill('white'));
  const [revealedColors, setRevealedColors] = useState(Array(9).fill(false));
  const [clickedCells, setClickedCells] = useState(Array(9).fill(false));
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    const shuffledColors = [...predefinedColors];
    for (let i = shuffledColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
    }
    setCellColors(shuffledColors);
    setRevealedColors(Array(9).fill(false));
    setClickedCells(Array(9).fill(false));
    setSequenceIndex(0);
  }, [predefinedColors]);

  const handleCellClick = (index) => {
    if (clickedCells[index]) return; 
    
    const targetColor = sequenceColors[sequenceIndex];
    const newRevealedColors = [...revealedColors];
  
    newRevealedColors[index] = true;
    setRevealedColors(newRevealedColors);
  
    if (cellColors[index] === targetColor) {
      const newClickedCells = [...clickedCells];
      newClickedCells[index] = true;
      setClickedCells(newClickedCells);
  
      const nextIndex = (sequenceIndex + 1) % sequenceColors.length;
      setSequenceIndex(nextIndex);

      setTimeout(() => {
        if (newClickedCells.every((clicked) => clicked)) {
          alert('Good job!');
        }
      }, 100); 
    } else {
      setTimeout(() => {
        setCellColors([...cellColors]); 
        setRevealedColors(Array(9).fill(false)); 
        setClickedCells(Array(9).fill(false));
        setSequenceIndex(0);
      }, 300); 
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Grid container spacing={2} sx={{ width: 900 }}>
        {cellColors.map((color, index) => (
          <Grid item xs={4} key={index}>
            <GridCell
              color={revealedColors[index] ? color : 'white'} 
              onClick={() => handleCellClick(index)}
              isClickable={!clickedCells[index]} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorGrid;