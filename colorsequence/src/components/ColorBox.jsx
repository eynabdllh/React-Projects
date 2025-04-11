import React from 'react';
import Box from '@mui/material/Box';

const ColorBox = ({ color }) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        backgroundColor: color,
      }}
    />
  );
};

export default ColorBox;