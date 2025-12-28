import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  const isFavorite = (id) => {
    return favorites.some((book) => book._id === id);
  };

  const addFavorite = (book) => {
    if (!isFavorite(book._id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((book) => book._id !== id));
  };

  const toggleFavorite = (book) => {
    if (isFavorite(book._id)) {
      removeFavorite(book._id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite, 
        toggleFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};