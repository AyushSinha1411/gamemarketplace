// Game management utilities for admin panel
// Uses localStorage to store games (can be easily replaced with API calls)

const GAMES_KEY = 'vermillion_blaze_games';

// Get all games
export const getAllGames = () => {
  if (typeof window === 'undefined') return [];
  const games = localStorage.getItem(GAMES_KEY);
  return games ? JSON.parse(games) : [];
};

// Save games to localStorage
export const saveGames = (games) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

// Add a new game
export const addGame = (game) => {
  const games = getAllGames();
  const newGame = {
    ...game,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString(), // Track when game was added
  };
  games.push(newGame);
  saveGames(games);
  return newGame;
};

// Update a game
export const updateGame = (gameId, updatedGame) => {
  const games = getAllGames();
  const index = games.findIndex(g => g.id === gameId);
  if (index !== -1) {
    games[index] = { ...games[index], ...updatedGame, id: gameId };
    saveGames(games);
    return games[index];
  }
  return null;
};

// Delete a game
export const deleteGame = (gameId) => {
  const games = getAllGames();
  const filtered = games.filter(g => g.id !== gameId);
  saveGames(filtered);
  return filtered;
};

// Initialize with default games if localStorage is empty
export const initializeGames = (defaultGames) => {
  if (typeof window === 'undefined') return;
  const existing = getAllGames();
  if (existing.length === 0) {
    // Add createdAt timestamp to default games (set to past dates so they appear older)
    const gamesWithTimestamp = defaultGames.map((game, index) => ({
      ...game,
      createdAt: new Date(Date.now() - (index * 86400000)).toISOString() // Spread out over days
    }));
    saveGames(gamesWithTimestamp);
  } else {
    // Ensure all existing games have createdAt timestamp
    const updatedGames = existing.map(game => {
      if (!game.createdAt) {
        return {
          ...game,
          createdAt: game.id ? new Date(game.id).toISOString() : new Date().toISOString()
        };
      }
      return game;
    });
    saveGames(updatedGames);
  }
};


