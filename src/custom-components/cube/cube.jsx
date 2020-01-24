import React, { useState, useEffect } from "react";
import FrontSide from "./frontside/frontside";
import BackSide from "./backside/backside";
import BottomSide from "./bottomside/bottomside";
import TopSide from "./topside/topside";
import RightSide from "./rightside/rightside";
import LeftSide from "./leftside/leftside";
import userService from "../../services/userlogic";

const Cube = ({ onClearSearch, setBackGround }) => {
  let [xdeg, setXdeg] = useState(0);
  let [ydeg, setYdeg] = useState(-90);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const cubeControler = keyCode => {
    switch (keyCode) {
      case 38: //UP
        if (ydeg > -90) setYdeg((ydeg -= 90));
        break;

      case 40: //DOWN
        if (ydeg < 90) setYdeg((ydeg += 90));
        break;

      case 39: //LEFT
        setXdeg((xdeg -= 90));
        break;

      case 37: //RIGHT
        setXdeg((xdeg += 90));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.onkeydown = ev => cubeControler(ev.keyCode);
  }, []);

  useEffect(() => {
    console.log({ xdeg }, { ydeg });
  }, [xdeg, ydeg]);

  const handlerArtistFound = data => {
    setArtists(data);
    setXdeg((xdeg -= 90));
  };

  const handlerTracksFound = data => {
    setTracks(data);
    setXdeg((xdeg -= 90));
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
          setYdeg((ydeg += 90));
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

  const handleRegister = () => setYdeg((ydeg += 180));

  const handleClickRegisterLogin = () => setYdeg((ydeg -= 180));

  const handleAlbums = albums => {
    setAlbums(albums);
    setXdeg((xdeg -= 90));
  };

  const handleClearSearch = () => {
    setArtists([]);
    setTracks([]);
    setAlbums([]);
    onClearSearch();
  };

  return (
    <section className="container">
      <section
        style={{
          transform: "rotateY(" + xdeg + "deg) rotateX(" + ydeg + "deg)"
        }}
        className="cube"
      >
        <FrontSide
          onClearSearch={handleClearSearch}
          onArtistFound={handlerArtistFound}
        ></FrontSide>
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
