import React, { useState, useContext } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";
import Message from "../../message";
//store:
import { StoreContext } from "../../../store";

const BackSide = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const {
    albumImage: [, setAlbumImage],
    albumTracks: [, setAlbumTracks],
    albums: [albums]
  } = useContext(StoreContext);

  const handleClickOnAlbum = albumId => {
    try {
      iTunesLogic
        .getSongsbyAlbumId(albumId)
        .then(songs => {
          const albumImage = albums.find(x => x.id === albumId).image;
          setAlbumImage(albumImage);
          return { songs, albumImage };
        })
        .then(({ songs, albumImage }) =>
          iTunesLogic.setSongsImage(songs, albumImage)
        )
        .then(songsWithImage => {
          setAlbumTracks(songsWithImage);
          document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="back">
      <div className="rotateY-180">
        <Header />
        <SideTitle title="Albums list" />
        <List onAlbumClick={handleClickOnAlbum} type="tracks" list={albums} />
        <Message message={errorMessage} clearMessage={clearMessage} />
      </div>
    </section>
  );
};
export default BackSide;
