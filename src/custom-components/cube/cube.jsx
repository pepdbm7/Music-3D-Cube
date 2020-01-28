import React, { useState, useContext } from "react";
import FrontSide from "./frontside/frontside";
import BackSide from "./backside/backside";
import BottomSide from "./bottomside/bottomside";
import TopSide from "./topside/topside";
import RightSide from "./rightside/rightside";
import LeftSide from "./leftside/leftside";
import { StoreContext } from "../../store";

const Cube = ({ xdeg, ydeg }) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const {
    playlists: [playlists]
  } = useContext(StoreContext);

  const handlerFoundArtists = artists => {
    setArtists(artists);
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
  };

  const handlerTracksFound = tracks => {
    setTracks(tracks);
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
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
        <FrontSide foundArtists={handlerFoundArtists} />
        <BackSide albumTracks={handlerTracksFound} albumlist={albums} />
        <LeftSide tracks={tracks} />
        <RightSide onAlbums={handleAlbums} artists={artists} />
        <TopSide />
        <BottomSide playlists={playlists} />
      </section>
    </section>
  );
};

export default Cube;
