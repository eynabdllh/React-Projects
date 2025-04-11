# 🎲 Bingo Game App

A **Bingo Game** where players can fetch multiple Bingo cards, remove them, and check if they have won. The application interacts with APIs for card data and win verification.

### 1. App.jsx
- This is the entry point of the application. It renders the **Bingo Game** title and the `GameBoard` component, which contains the core logic of the game.

### 2. BingoCard.jsx
- This component renders individual Bingo cards and handles the logic for checking wins.
- Checking Win: Click the "Check Win" button on a card to verify if it’s a winning card by calling the backend API.

### 3. GameBoard.jsx
- This component manages the game logic. It allows fetching new Bingo cards, displaying them on the board, and removing them when needed.
- Fetching New Cards: Click the "Get New Bingo Card" button to call the backend API and display a new card on the board.
- Removing Cards: Use the "Remove Card" button to delete any card from the board