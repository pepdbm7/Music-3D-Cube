import React, { useState } from "react";
import Header from "../../header/header";
import Search from "../../search/search";
import iTunesLogic from "../../../services/iTunesLogic";

const FrontSide = ({ onArtistFound, onClearSearch }) => {
  const [message, setMessage] = useState("");

  const handleSearch = value => {
    setMessage("");

    let artists = [];
    try {
      iTunesLogic
        .getArtists(value)
        .then(res => {
          res.map(artist =>
            artists.push({
              id: artist.artistId,
              name: artist.artistName,
              image: ""
            })
          );
          return artists;
        })
        .then(data => {
          onArtistFound(data);
        })
        .catch(err => {
          console.log(err.message);
          setMessage("Sorry, there is a problem right now. Try later");
        });
    } catch (err) {
      console.log(err.message);
      setMessage("Sorry, there is a problem right now. Try later");
    }
  };

  const handleClearSearch = () => {
    setMessage("");
    onClearSearch();
  };

  return (
    <section className="front">
      <Header></Header>
      <Search
        message={message}
        onClearSearch={handleClearSearch}
        onSearch={handleSearch}
      ></Search>
    </section>
  );
};

export default FrontSide;
