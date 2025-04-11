import React from 'react';
import Box from '@mui/material/Box';

const GridCell = ({ color, onClick, isClickable }) => {
  return (
    <Box
      sx={{
        width: 280,
        height: 100,
        backgroundColor: color,
        border: '2px solid #ccc',
        borderRadius: 1,
        cursor: isClickable ? 'pointer' : 'default',
        pointerEvents: isClickable ? 'auto' : 'none',
      }}
      onClick={isClickable ? onClick : undefined}
    />
  );
};

export default GridCell;