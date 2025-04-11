import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer(){
  return (
    <footer style={{marginTop: '20px', padding: '10px', textAlign: 'center'}}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          &copy; 2024 Art Gallery
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;