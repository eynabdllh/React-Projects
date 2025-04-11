import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    mode: 'dark', 
    background: {
      default: '#000000',
    },
    text: {
      primary: '#f0f0f0',
    },
  },
});

export default theme;