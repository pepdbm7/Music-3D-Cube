import React, { useState, useContext } from "react";
import iTunesLogic from "../../services/iTunesLogic";
import Message from "../message";
//store:
import { StoreContext } from "../../store";

const Search = () => {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const {
    artists: [, setArtists],
    albums: [, setAlbums],
    albumImage: [, setAlbumImage],
    albumTracks: [, setAlbumTracks]
  } = useContext(StoreContext);

  const handleChange = ev => {
    setSearch(ev.target.value);
  };

  const onSearch = e => {
    e.preventDefault();
    try {
      iTunesLogic
        .getArtists(search)
        .then(artists => {
          setArtists(artists);
          document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 }));
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

  const onClear = () => {
    setSearch("");
    setArtists([]);
    setAlbums([]);
    setAlbumTracks([]);
    setAlbumImage("");
  };

  return (
    <>
      <form className="custom-form" onSubmit={onSearch}>
        <div className="form-group">
          <label>Search Artists</label>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            className="form-control"
            placeholder="Write an artist"
            autoFocus
          />
        </div>
        <button type="submit">Search Artists</button>
        <button onClick={onClear} type="button">
          Clear search
        </button>
      </form>
      <Message message={errorMessage} clearMessage={clearMessage} />
    </>
  );
};

export default Search;
