import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [playLists, setPlaylists] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [albumImage, setAlbumImage] = useState("");

  const store = {
    playlists: [playLists, setPlaylists],
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    albumImage: [albumImage, setAlbumImage]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
