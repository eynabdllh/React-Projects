import React from 'react';
import Grid from '@mui/material/Grid2';
import ColorBox from './ColorBox';

const ColorSequence = ({ sequenceColors }) => {
  return (
    <Grid container justifyContent="center" spacing={1}>
      {sequenceColors.map((color, index) => (
        <Grid item key={index}>
          <ColorBox color={color} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorSequence;