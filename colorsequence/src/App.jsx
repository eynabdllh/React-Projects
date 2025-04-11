import React from 'react';
import ColorGrid from './components/ColorGrid';
import ColorSequence from './components/ColorSequence';
import Box from '@mui/material/Box';
import { ThemeProvider, CssBaseline, Typography } from '@mui/material';
import theme from './theme';

const App = () => {
  const predefinedColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'brown'];
  const sequenceColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'brown'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Typography variant='h2' textAlign={'center'} paddingTop={10}>Color Sequence</Typography>
        <Box sx={{ textAlign: 'center', paddingTop: 5 }}>
          <ColorSequence sequenceColors={sequenceColors} />
          <ColorGrid
            predefinedColors={predefinedColors}
            sequenceColors={sequenceColors}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;