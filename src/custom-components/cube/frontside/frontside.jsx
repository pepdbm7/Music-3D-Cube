import React, { useState } from "react";
import Header from "../../header/header";
import Search from "../../search/search";
import iTunesLogic from "../../../services/iTunesLogic";

const FrontSide = ({ onArtistFound }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const notFoundMessage = () => {
    setErrorMessage("No albums found, try another artist");
    setTimeout(() => {
      setErrorMessage("");
    }, 2500);
  };

  const handleSearch = value => {
    iTunesLogic
      .getArtists(value)
      .then(data => {
        onArtistFound(data);
      })
      .catch(err => {
        console.log(err.message);
        notFoundMessage();
      });
  };

  return (
    <section className="front">
      <Header />
      <Search onSearch={handleSearch} />

      {errorMessage && <p className="error_message">{errorMessage}</p>}
    </section>
  );
};

export default FrontSide;
