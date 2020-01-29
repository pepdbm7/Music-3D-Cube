import React, { useState, useContext } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";
import Message from "../../message";
//store:
import { StoreContext } from "../../../store";

const RightSide = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const {
    artists: [artists],
    albums: [, setAlbums]
  } = useContext(StoreContext);

  const handleAlbums = id => {
    try {
      iTunesLogic
        .getAlbumsByArtistId(id)
        .then(albums => {
          setAlbums(albums);
          document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
        })
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
      <Message message={errorMessage} clearMessage={clearMessage} />
    </section>
  );
};

export default RightSide;
