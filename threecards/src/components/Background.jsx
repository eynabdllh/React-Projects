// Background.jsx
import React from 'react';
import styled from 'styled-components';
import backgroundImage from './background.jpg'; // Import the image

const BackgroundDiv = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust height as needed */
  width: 100vw; /* Adjust width as needed */
`;

const Background = () => {
  return (
    <BackgroundDiv>
    </BackgroundDiv>
  );
};

export default Background;
