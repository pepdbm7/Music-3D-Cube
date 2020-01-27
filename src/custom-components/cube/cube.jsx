import React, { useState } from "react";
import FrontSide from "./frontside/frontside";
import BackSide from "./backside/backside";
import BottomSide from "./bottomside/bottomside";
import TopSide from "./topside/topside";
import RightSide from "./rightside/rightside";
import LeftSide from "./leftside/leftside";
import userService from "../../services/userlogic";

const Cube = ({ setBackGround, xdeg, ydeg }) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const handlerArtistFound = data => {
    setArtists(data);
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
  };

  const handlerTracksFound = data => {
    setTracks(data);
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
  };

  const handleLogin = loggedIn => {
    if (loggedIn) {
      userService
        .getUserPlayLists()
        .then(res => {
          if (res.length)
            res.map(
              el => (el.image = require("../../assets/img/playlist.png"))
            );
          setPlaylists(res);
          setIsLogged(loggedIn);
          document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
        })
        .catch(err => err);
    }
  };

  const handleLogout = () => setIsLogged(false);

  const refreshPlayLists = () => {
    userService
      .getUserPlayLists()
      .then(res => {
        if (res.length) {
          res.map(el => (el.image = require("../../assets/img/playlist.png")));
        }
        setPlaylists(res);
      })
      .catch(err => alert(err.message));
  };

  const handleRegister = () => {
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
  };

  const handleClickRegisterLogin = () => {
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));
  };

  const handleAlbums = albums => {
    setAlbums(albums);
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
  };

  return (
    <section className="container">
      <section
        style={{
          transform: "rotateY(" + xdeg + "deg) rotateX(" + ydeg + "deg)"
        }}
        className="cube"
      >
        <FrontSide onArtistFound={handlerArtistFound}></FrontSide>
        <BackSide
          setBackGround={setBackGround}
          onTracks={handlerTracksFound}
          albumlist={albums}
        ></BackSide>
        <LeftSide isLogged={isLogged} tracks={tracks}></LeftSide>
        <RightSide onAlbums={handleAlbums} artists={artists}></RightSide>
        <TopSide
          onLogout={handleLogout}
          onLogin={handleLogin}
          onClickRegister={handleRegister}
        ></TopSide>
        <BottomSide
          OnCreatedPlayList={refreshPlayLists}
          playlists={playlists}
          onClickLogin={handleClickRegisterLogin}
          isLogged={isLogged}
        ></BottomSide>
      </section>
    </section>
  );
};

export default Cube;
