import React, { useState, useEffect, useContext } from "react";
import Login from "../../login/login";
import Header from "../../header/header";
import userService from "../../../services/userlogic";
import playListImage from "../../../assets/img/playlist.png";
import { StoreContext } from "../../../store";

const TopSide = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    playlists: [, setPlaylists],
    isLoggedIn: [isLoggedIn, setIsLoggedIn]
  } = useContext(StoreContext);

  const getPlaylists = loggedIn => {
    if (loggedIn) {
      userService
        .getUserPlayLists()
        .then(playlists => {
          if (playlists.length) playlists.map(el => (el.image = playListImage));
          setPlaylists(playlists);
          document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
        })
        .catch(err => err);
    }
  };

  useEffect(() => {
    const isUserInStorage = userService.getSessionFromStorage();
    setIsLoggedIn(isUserInStorage);
    getPlaylists(isUserInStorage);
  }, []);

  const handleLogin = ({ username, password }) => {
    try {
      userService
        .authenticateUser(username, password)
        .then(() => {
          setIsLoggedIn(true);
          getPlaylists(true);
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <section className="top">
      <Header />
      {isLoggedIn ? (
        <section className="top__seccion-button">
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        </section>
      ) : (
        <Login message={errorMessage} onLogin={handleLogin}></Login>
      )}
    </section>
  );
};

export default TopSide;
