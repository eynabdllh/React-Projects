import React from 'react';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontFamily: 'cursive' 
      }}>
        <span>{'\u{1F3B2}'}</span> Bingo Game <span>{'\u{1F3B2}'}</span>
      </h1>
      <GameBoard />
    </div>
  );
};

export default App;