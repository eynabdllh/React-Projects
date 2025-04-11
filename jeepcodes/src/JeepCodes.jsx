import React, { useState } from "react";
import {Box, Button, TextField, Typography, Paper, Chip, Card, CardContent} from "@mui/material";
import Grid from '@mui/material/Grid2';

const jeepCodeRoutes = {
  "01A": ["Alpha", "Bravo", "Charlie", "Echo", "Golf"],
  "02B": ["Alpha", "Delta", "Echo", "Foxtrot", "Golf"],
  "03C": ["Charlie", "Delta", "Foxtrot", "Hotel", "India"],
  "04A": ["Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
  "04D": ["Charlie", "Echo", "Foxtrot", "Golf", "India"],
  "06B": ["Delta", "Hotel", "Juliet", "Kilo", "Lima"],
  "06D": ["Delta", "Foxtrot", "Golf", "India", "Kilo"],
  "10C": ["Foxtrot", "Golf", "Hotel", "India", "Juliet"],
  "10H": ["Foxtrot", "Hotel", "Juliet", "Lima", "November"],
  "11A": ["Foxtrot", "Golf", "Kilo", "Mike", "November"],
  "11B": ["Foxtrot", "Golf", "Lima", "Oscar", "Papa"],
  "20A": ["India", "Juliet", "November", "Papa", "Romeo"],
  "20C": ["India", "Kilo", "Lima", "Mike", "Romeo"],
  "42C": ["Juliet", "Kilo", "Lima", "Mike", "Oscar"],
  "42D": ["Juliet", "November", "Oscar", "Quebec", "Romeo"],
};

const colorPalette = ["red", "violet", "orange", "green", "blue", "brown", "cyan", "purple", "orange", "pink",];

const JeepCodes = () => {
  const [input, setInput] = useState("");
  const [routes, setRoutes] = useState([]);
  const [placeColors, setPlaceColors] = useState({});

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const validateInput = (input) => {
    const regex = /^(\d{2}[A-Z])(,\d{2}[A-Z])*$/;
    return regex.test(input);
  };

  const findCommonPairs = (codes, routes) => {
    const pairMap = {}; 

    for(let i=0; i<codes.length; i++) {
      for(let j=i+1; j<codes.length; j++) {
        const routeA = routes[i];
        const routeB = routes[j];
        const pairKey = `${codes[i]}-${codes[j]}`;
        const commonPlaces = routeA.filter((place) => routeB.includes(place));

        commonPlaces.forEach((place) => {
          if (!pairMap[place]) {
            pairMap[place] = [];
          }
          pairMap[place].push(pairKey);
        });
      }
    }

    return pairMap;
  };

  // function to assign colors based on the pairs of common places
  const assignColorsToPlaces = (commonPairs) => {
    const placeColors = {};
    let colorIndex = 0;
    
    const pairGroups = {};

    Object.keys(commonPairs).forEach((place) => {
      const pairKey = commonPairs[place].join(",");

      if (!pairGroups[pairKey]) {
        pairGroups[pairKey] = [];
      }
      pairGroups[pairKey].push(place);
    });

    Object.keys(pairGroups).forEach((pairKey) => {
      const color = colorPalette[colorIndex % colorPalette.length];
      pairGroups[pairKey].forEach((place) => {
        placeColors[place] = color;
      });
      colorIndex++;
    });

    return placeColors;
  };

  const handleSubmit = () => {
    if (!validateInput(input)) {
      alert(
        "Invalid input!!! Please use the correct format: two digits followed by a letter (e.g., 01A). Separate each code with a comma, and no spaces."
      );  
      return;
    }

    const codes = input.split(",");
    const newRoutes = codes.map((code) => jeepCodeRoutes[code]);
    const commonPairs = findCommonPairs(codes, newRoutes);

    setRoutes(codes.map((code, index) => ({code, route: newRoutes[index]})));

    const colors = assignColorsToPlaces(commonPairs);
    setPlaceColors(colors);
  };

  const renderRoute = (route) => {
    return route.map((place, index) => {
      let color = placeColors[place] || "default";

      return (
        <React.Fragment key={index}>
          <Chip
            label={place}
            color={color !== "default" ? "primary" : undefined}
            sx={{
              margin: "4px",
              backgroundColor: color !== "default" ? color : undefined,
              color: color !== "default" ? "#fff" : undefined,
            }}
          />
          {index < route.length - 1 && (
            <Typography variant="body2" component="span">→</Typography>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box sx={{display: "flex", height: "100vh"}}>
      <Paper
        sx={{
          p: 4,
          width: "30%",
          backgroundColor: "#f3e5f5",
          border: "5px solid violet",
          paddingTop: 30,
          borderRadius: 0,
        }}
      >
        <Typography variant="h5" gutterBottom>Jeep Code Route Display</Typography>
        <TextField
          label="Enter Jeep Codes (comma separated, no spaces)"
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleInputChange}
          sx={{mb: 2}}
        />
        <Button variant="contained" onClick={handleSubmit} color="secondary" fullWidth>Show Routes</Button>
      </Paper>
      <Box
        sx={{
          width: "60%",
          backgroundColor: "#f3e5f5",
          padding: 4,
          border: "5px solid violet",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>Jeepney Routes</Typography>
        <Grid container spacing={2} direction={"column"}>
          {routes.length > 0 &&
            routes.map(({code, route}, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{backgroundColor: "#e1bee7", padding: 2}}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{code}</Typography>
                    <Box sx={{display: "flex", alignItems: "center"}}>{renderRoute(route)}</Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default JeepCodes;