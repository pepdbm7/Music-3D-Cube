import React, { useState } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import iTunesLogic from "../../../services/iTunesLogic";

const BackSide = ({ albumlist, onTracks, setBackGround }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const notFoundMessage = () => {
    setErrorMessage("No songs found, try another album");
    setTimeout(() => {
      setErrorMessage("");
    }, 2500);
  };

  const handleClickOnAlbum = id => {
    iTunesLogic
      .getSongsbyAlbumId(id)
      .then(songs => {
        return (
          songs.length < 1 ? notFoundMessage() : onTracks(songs),
          setBackGround(albumlist.find(x => x.id === id).image)
        );
      })
      .catch(err => {
        console.log(err.message);
        notFoundMessage();
      });
  };

  return (
    <section className="back">
      <div className="rotateY-180">
        <Header />
        <SideTitle title="Albums list" />
        <List
          onAlbumClick={handleClickOnAlbum}
          type="tracks"
          list={albumlist}
        />
        {errorMessage && <p className="error_message">{errorMessage}</p>}
      </div>
    </section>
  );
};
export default BackSide;
