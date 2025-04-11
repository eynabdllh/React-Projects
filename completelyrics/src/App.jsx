  import { Button, TextField } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
  import './App.css';

  const LandingPAge = ({}) => {
    return '';
  }
  const FirstSinger = ({ typedLyrics, handleTextAreaChange, outlineColor }) => {
    return (
      <TextField
        value={typedLyrics}
        onChange={handleTextAreaChange}
        variant="outlined"
        sx={{
          width: 600,
          marginBottom: "20px",
          color: "#fff",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: outlineColor,
            },
          },
        }}
        rows={1}
      />
    );
  };

  const SecondSinger = ({ typedLyrics, handleTextAreaChange, outlineColor }) => {
    return (
      <div>
        <TextField
          value={typedLyrics}
          onChange={handleTextAreaChange}
          variant="outlined"
          sx={{
            width: 600,
            marginBottom: "20px",
            color: "#fff", 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: outlineColor,
              },
            },
          }}
          rows={1}
        />
      </div>
    );
  };

  const ThirdSinger = ({ typedLyrics, handleTextAreaChange, outlineColor }) => {
    return (
      <div>
        <TextField
          value={typedLyrics}
          onChange={handleTextAreaChange}
          variant="outlined"
          sx={{
            width: 600,
            marginBottom: "20px",
            color: "#fff",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: outlineColor,
              },
            },
          }}
          rows={1}
        />
      </div>
    );
  };

  const FourthSinger = ({ typedLyrics, handleTextAreaChange, outlineColor }) => {
    return (
      <div>
        <TextField
          value={typedLyrics}
          onChange={handleTextAreaChange}
          variant="outlined"
          sx={{
            width: 600,
            marginBottom: "20px",
            color: "#fff",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: outlineColor,
              },
            },
          }}
          rows={1}
        />
      </div>
    );
  };

  const App = () => {
    const [activeSinger, setActiveSinger] = useState(null);
    const [typedLyrics, setTypedLyrics] = useState('');
    const [showTextField, setShowTextField] = useState(false);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
      const path = window.location.pathname;
      const singer = path.split('/').pop().toUpperCase() + ' SINGER';
      
      if (['FIRST SINGER', 'SECOND SINGER', 'THIRD SINGER', 'FOURTH SINGER'].includes(singer)) {
        setShowTextField(true);
        setActiveSinger(singer);
      }
    }, []); 

    const getBackgroundColor = (singer) => {
      switch (singer) {
        case "FIRST SINGER":
          return "#b3b3ff";
        case "SECOND SINGER":
          return "#5cd65c";
        case "THIRD SINGER":
          return "#00e6b8";
        case "FOURTH SINGER":
          return "#ff99ff";
        default:
          return "#FFFFFF"; // Default background color if activeSinger doesn't match any case
      }
    };

    const handleButtonClick = (singer) => {
      setShowTextField(true);

      if (activeSinger && typedLyrics) {
        setEntries(prevEntries => [
          ...prevEntries,
          { singer: activeSinger, lyrics: typedLyrics,  
            backgroundColor: getBackgroundColor(activeSinger)
          }
        ]);
      }
      setActiveSinger(singer);
      setTypedLyrics('');
    };

    const handleTextAreaChange = (e) => {
      setTypedLyrics(e.target.value);
    };

    return (
      <Router>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          paddingLeft: '20px',
        }}>

          <h1 style={{marginBottom: "1px"}}>Complete The Lyrics</h1>

          <div style={{margin: '20px'}}>
            <Link to="/singer/first">
              <Button variant="contained" onClick={() => handleButtonClick("FIRST SINGER")} sx={{ borderRadius: 0, backgroundColor: "#b3b3ff" }}>
                FIRST SINGER
              </Button>
            </Link>
            <Link to="/singer/second">
              <Button variant="contained" onClick={() => handleButtonClick("SECOND SINGER")} sx={{ borderRadius: 0, backgroundColor: "#5cd65c" }}>
                SECOND SINGER
              </Button>
            </Link>
            <Link to="/singer/third">
              <Button variant="contained" onClick={() => handleButtonClick("THIRD SINGER")} sx={{ borderRadius: 0, backgroundColor: "#00e6b8" }}>
                THIRD SINGER
              </Button>
              </Link>
            <Link to="/singer/fourth">
              <Button variant="contained" onClick={() => handleButtonClick("FOURTH SINGER")} sx={{ borderRadius: 0, backgroundColor: "#ff99ff" }}>
                FOURTH SINGER
              </Button>
            </Link>
          </div>
          
            <Routes>
              <Route
                path="/singer/" 
                element={<LandingPAge/>}
              />
              <Route
                path="/singer/first"
                element={<FirstSinger typedLyrics={typedLyrics} handleTextAreaChange={handleTextAreaChange} singerName="First Singer" outlineColor="#b3b3ff" />}
              />
              <Route
                path="/singer/second"
                element={<SecondSinger typedLyrics={typedLyrics} handleTextAreaChange={handleTextAreaChange} singerName="Second Singer" outlineColor="#5cd65c" />}
              />
              <Route
                path="/singer/third"
                element={<ThirdSinger typedLyrics={typedLyrics} handleTextAreaChange={handleTextAreaChange} singerName="Third Singer" outlineColor="#00e6b8" />}
              />
              <Route
                path="/singer/fourth"
                element={<FourthSinger typedLyrics={typedLyrics} handleTextAreaChange={handleTextAreaChange} singerName="Fourth Singer" outlineColor="#ff99ff" />}
              />
            </Routes>

          <div>
            <div style={{ 
              color: 'white',
              border: '3px solid #d9d9d9',
              textAlign: "left",
              padding: '10px', 
              borderRadius: '30px',
              width: '900px',
              height: '300px',
              overflowY: 'auto'}}>
              <div style={{margin:'50px'}}>
              {entries.map((entry, index) => (
                <div key={index} className={`lyrics-box ${entry.singer.toLowerCase().replace(" ", "-")}`} 
                style={{ backgroundColor: entry.backgroundColor}}>
                  <p>{entry.lyrics}</p>
                </div>
              ))}
              {activeSinger && typedLyrics && (
                <div className={`lyrics-box ${activeSinger.toLowerCase().replace(" ", "-")}` } 
                style={{ backgroundColor: getBackgroundColor(activeSinger) }}>
                  <p>{typedLyrics}</p>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  };

  export default App;