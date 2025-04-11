import React from 'react';
import { Breadcrumbs, Container, Link, Typography } from '@mui/material';

function BreadcrumbsComponent(){
  return (
    <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{margin: 2}}>
            <Link color="inherit" href="/">Home</Link>
            <Typography color="textPrimary">Gallery</Typography>
        </Breadcrumbs>
   </Container>
  );
}

export default BreadcrumbsComponent;