import React from 'react';
import { Grid2, Card, CardContent, CardMedia, IconButton, Typography, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';
import pic3 from '../images/pic3.jpg';
import pic4 from '../images/pic4.jpg';
import pic5 from '../images/pic5.jpg';
import pic6 from '../images/pic6.jpg';

function PhotoGallery(){
  return (
    <Grid2 container spacing={2} justifyContent="center" sx={{padding: 2}}>
      {/*Card 1*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic1}
            alt="Photo 1"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Serenity by the Lake
            </Typography>
            <Typography variant="body2" color="textSecondary">
             A calm morning by the lake, where the water mirrors the sky, inviting you to breathe deeply and find peace.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
      
      {/*Card 2*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic2}
            alt="Photo 2"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Sunset Silhouettes
            </Typography>
            <Typography variant="body2" color="textSecondary">
             As the sun dips below the horizon, silhouettes come to life, capturing the last light of a perfect day.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>

      {/*Card 3*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic3}
            alt="Photo 3"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Urban Pulse
            </Typography>
            <Typography variant="body2" color="textSecondary">
             The city never sleeps, and this photo pulses with its energy—bright lights, bustling streets, and endless possibilities.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>

      {/*Card 4*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic4}
            alt="Photo 4"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Whispers of the Forest
            </Typography>
            <Typography variant="body2" color="textSecondary">
             Deep in the forest, where sunlight filters through the leaves, nature's quiet beauty speaks in whispers.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>

      {/*Card 5*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic5}
            alt="Photo 5"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Echoes of History
            </Typography>
            <Typography variant="body2" color="textSecondary">
             Ancient ruins stand tall, weathered by time, yet echoing stories of a past that still lingers in the present.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>

      {/*Card 6*/}
      <Grid2 item xs={12} sm={6} md={4}>
        <Card sx={{maxWidth: 345, margin: 2}}>
          <CardMedia
            component="img"
            height="340"
            image={pic6}
            alt="Photo 6"
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
             Waves of Freedom
            </Typography>
            <Typography variant="body2" color="textSecondary">
             Waves crash against the shore, wild and untamed, symbolizing the boundless freedom of the open sea.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="contained" color="primary">View</Button>
                <Button variant="contained" color="secondary" startIcon={<ShareIcon />}>Share</Button>
              </Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default PhotoGallery;