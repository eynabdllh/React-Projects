import React from 'react';
import { TextField, Box, Container } from '@mui/material';

function Search(){
  return (
    <Container>
      <Box sx={{padding: 2}}>
        <TextField fullWidth label="Search" variant="outlined" placeholder="Search photos"/>
      </Box>
    </Container>
  );
}

export default Search;