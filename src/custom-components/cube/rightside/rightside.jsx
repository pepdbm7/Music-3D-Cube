import React, { useState } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";

const RightSide = ({ artists, onAlbums }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleAlbums = id => {
    iTunesLogic
      .getAlbumsByArtistId(id)
      .then(albums => {
        onAlbums(albums);
      })
      .catch(err => setErrorMessage(err.message));
  };

  return (
    <section className="right">
      <Header></Header>
      <SideTitle title="Artists List"></SideTitle>
      <List onAlbums={handleAlbums} type="albums" list={artists}></List>
      {errorMessage && <p style={{ color: "tomato" }}>{errorMessage}</p>}
    </section>
  );
};

export default RightSide;
