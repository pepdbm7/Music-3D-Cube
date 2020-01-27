import React, { useState } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";

const RightSide = ({ artists, onAlbums }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const notFoundMessage = () => {
    setErrorMessage("No songs found, try another album");
    setTimeout(() => {
      setErrorMessage("");
    }, 2500);
  };

  const handleAlbums = id => {
    iTunesLogic
      .getAlbumsByArtistId(id)
      .then(albums => {
        albums.length < 1 ? notFoundMessage() : onAlbums(albums);
      })
      .catch(err => {
        console.log(err.message);
        notFoundMessage();
      });
  };

  return (
    <section className="right">
      <Header />
      <SideTitle title="Artists List" />
      <List onAlbums={handleAlbums} type="albums" list={artists} />
      {errorMessage && <p className="error_message">{errorMessage}</p>}
    </section>
  );
};

export default RightSide;
