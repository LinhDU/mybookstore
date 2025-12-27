import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Lấy dữ liệu từ localStorage khi mở web để không bị mất danh sách
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('neverland_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Tự động lưu vào máy tính mỗi khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem('neverland_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Hàm kiểm tra xem sách đã có trong danh sách chưa
  const isFavorite = (id) => {
    return favorites.some((item) => item._id === id || item.id === id);
  };

  // Hàm Toggle: Nếu có rồi thì xóa, chưa có thì thêm
  const toggleFavorite = (book) => {
    const bookId = book._id || book.id;
    
    setFavorites((prev) => {
      if (isFavorite(bookId)) {
        // Nếu đã yêu thích -> Lọc bỏ cuốn đó ra (Xóa)
        return prev.filter((item) => (item._id !== bookId && item.id !== bookId));
      } else {
        // Nếu chưa có -> Thêm cuốn đó vào mảng cũ (GIỮ LẠI SÁCH CŨ)
        return [...prev, book]; 
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};