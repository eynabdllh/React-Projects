import React from 'react';
import { ThemeProvider, CssBaseline, Container, Typography } from '@mui/material';
import AppBar from './components/AppBar';
import Breadcrumbs from './components/Breadcrumbs';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import Search from './components/Search';
import theme from './theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Breadcrumbs />
      <Search />
      <main> 
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom color="textPrimary">Gallery</Typography>
            <Typography variant="body1" align="center" color="textSecondary" marginBottom={5}>
            Step into a world where every photo whispers a tale. This gallery isn't just a collection of images—it's a journey through moments 
            frozen in time. Each picture invites you to pause, look closer, and discover the story hidden within. Take a moment, explore, and 
            let your imagination wander.
            </Typography>
          </Container>
        </div>
      </main>
      <PhotoGallery />
      <Footer />
    </ThemeProvider>
  );
}

export default App;