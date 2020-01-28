import React, { useState } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";
import ErrorMessage from "../../errormessage";

const RightSide = ({ artists, onAlbums }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const handleAlbums = id => {
    try {
      iTunesLogic
        .getAlbumsByArtistId(id)
        .then(albums => onAlbums(albums))
        .catch(err => {
          console.log(err.message);
          setErrorMessage(err.message);
        });
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="right">
      <Header />
      <SideTitle title="Artists List" />
      <List onAlbums={handleAlbums} type="albums" list={artists} />
      <ErrorMessage message={errorMessage} clearMessage={clearMessage} />
    </section>
  );
};

export default RightSide;
