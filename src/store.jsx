import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artsists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [albumImage, setAlbumImage] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [playLists, setPlaylists] = useState(true);

  const store = {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    artists: [artsists, setArtists],
    albums: [albums, setAlbums],
    albumImage: [albumImage, setAlbumImage],
    albumTracks: [albumTracks, setAlbumTracks],
    playlists: [playLists, setPlaylists]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
