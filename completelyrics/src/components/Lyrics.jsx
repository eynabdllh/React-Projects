import { Box, Stack, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

class Lyric {
  constructor(content, singer, index) {
    this.content = content;
    this.singer = singer;
    this.index = index;
  }
}

class Singer {
  constructor(name, bgcolor, color, path) {
    this.name = name;
    this.bgcolor = bgcolor;
    this.color = color;
    this.path = path;
  }
}

export default function Lyrics() {
  const [activeLyrics, setActiveLyrics] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [activeSinger, setActiveSinger] = useState(undefined);
  const [textInputHidden, setTextInputHidden] = useState("none");
  const navigate = useNavigate();

  var singerList = [
    new Singer("First Singer", "#7E60BF", "#F5F5F7", "/first"),
    new Singer("Second Singer", "#1E3E62", "#F5F5F7", "/second"),
    new Singer("Third Singer", "#FF6500", "#F5F5F7", "/third"),
    new Singer("Fourth Singer", "#6EC207", "#F5F5F7", "/fourth"),
  ];

  const deleteLyric = (index) => {
    if (index < -1) {
      return;
    }

    setActiveLyrics((activeLyrics) =>
      activeLyrics.filter((s, i) => i !== index)
    );
  };

  const lyricBox = (lyrics, singer, index) => {
    return (
      <Box
        key={index}
        sx={{
          backgroundColor: singer.bgcolor,
          color: singer.color,
          textAlign: "left",
          overflowY: "auto",
          maxHeight: "10em",
          maxWidth: "48em",
          px: 4,
          py: 2,
          borderRadius: 4,
          borderLeft: `5px solid ${singer.color}`,
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          padding: "5px 5px 5px 25px",
        }}
      >
        {lyrics}
        <Button onClick={() => deleteLyric(index)} sx={{fontWeight: "bold", color: singer.color}}>
          x 
        </Button>
      </Box>
    );
  };

  let handleLyricTextInput = () => {
    if (activeSinger === undefined) {
      return;
    }

    if (textInput === "") {
      return;
    }

    let newLyric = new Lyric(textInput, activeSinger);
    setActiveLyrics((prevLyrics) => [...prevLyrics, newLyric]);
    setTextInput("");
  };

  useEffect(() => {
    if (activeSinger === undefined) {
      return;
    }

    setTextInputHidden("flex");
    navigate(`/singer${activeSinger.path}`);
  }, [activeSinger, navigate, setTextInputHidden]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        backgroundColor: "#F5F5F7",
        backgroundImage: `url('/background.jpg')`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
      }}  
    >
      <Stack>
        {/* Title */}
        <h1>Complete the Lyrics</h1>

        {/* Box to Group the Singers */}
        <Stack direction="row" spacing={0}>
          {singerList.map((singer, index) => (
            <Button
              sx={{
                backgroundColor: singer.bgcolor,
                color: singer.color,
                px: 4,
                py: 2,
                borderRadius: 0,
                width: "15em",
                fontWeight: "bold",
              }}
              onClick={() => setActiveSinger(singer)}
            >
              {singer.name}
            </Button>
          ))}
        </Stack>

        {/* Text Input */}
        <TextField
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLyricTextInput(e);
            }
          }}
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
          label=""
          variant="outlined"
          sx={{
            display: textInputHidden,
            mt: 2,
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                boxShadow: 8,
              },
              "&:hover fieldset": {
                borderColor: "#E0E0E0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EE66A6",
              },
            },
            "& .MuiInputLabel-root": {
              color:  "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color:  "black",
            },
          }}
        />

        {/* Box to Hold the Lyrics */}
        <Box
          sx={{
            direction: "row",
            width: "48em",  
            height: "26em",
            overflow: "auto", 
            boxShadow: 10,
            border: 1,
            borderColor: "white",
            backgroundColor: "#F5F5F7",
            borderRadius: 2,
            my: 2,
            p: 4,
          }}
        >
          <Stack spacing={1}>
            {activeLyrics.map((lyric, index) => {
              return lyricBox(lyric.content, lyric.singer, index);
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}