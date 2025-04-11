import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BingoGame from './bingo-game';
import GameBoard from './GameBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* This route handles the game code input screen */}
        <Route path="/" element={<BingoGame />} />
        {/* This route handles the game play screen where users can add and play bingo cards */}
        <Route path="/game/:gameCode" element={<GameBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
