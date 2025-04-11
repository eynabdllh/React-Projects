import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';

function AppBarComponent(){
  return (
    <div> 
        <AppBar position="relative" sx={{backgroundColor: '#B53389'}}>
            <Toolbar>
                <CameraIcon sx={{marginRight: 2}}/>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                  Art Gallery
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    </div>  
  );
}

export default AppBarComponent;