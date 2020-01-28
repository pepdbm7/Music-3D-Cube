import React, { useState } from "react";
import Header from "../../header/header";
import Search from "../../search/search";
import iTunesLogic from "../../../services/iTunesLogic";
import ErrorMessage from "../../errormessage";

const FrontSide = ({ foundArtists }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const handleSearch = value => {
    try {
      iTunesLogic
        .getArtists(value)
        .then(artists => {
          foundArtists(artists);
        })
        .catch(err => {
          //captured errors after fetching:
          setErrorMessage(err.message);
        });
    } catch (err) {
      //captured typerrors, previous to the fetch:
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="front">
      <Header />
      <Search onSearch={handleSearch} />
      <ErrorMessage message={errorMessage} clearMessage={clearMessage} />
    </section>
  );
};

export default FrontSide;
