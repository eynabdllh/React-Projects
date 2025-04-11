const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
    },
    primary: {
      main: '#046411', // Custom primary color
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});
