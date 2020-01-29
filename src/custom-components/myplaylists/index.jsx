import React, { useState, useContext } from "react";

import Header from "../header/header";
import userService from "../../services/userlogic";
import SideTitle from "../sidetitle/sidetitle";
import List from "../list/list";
import defaultSongPreview from "../../assets/audio/default.mp3";
import defaultSongImage from "../../assets/img/playlist.png";
import Message from "../message";

import { StoreContext } from "../../store";

const MyPlaylists = () => {
  const [playListName, setPlayListName] = useState("");
  const [songPreview, setSongPreview] = useState("");
  const [tracks, setTracks] = useState(false);
  const [showFormAddPlayList, setShowFormAddPlayList] = useState(false);
  const [buttonText, setButtonText] = useState("Add PlayList");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const clearMessage = () => {
    setErrorMessage("");
    setSuccess(false);
  };

  const {
    playlists: [playlists, setPlaylists],
    isLoggedIn: [isLoggedIn]
  } = useContext(StoreContext);

  const handleChange = ev => {
    setPlayListName(ev.target.value);
  };

  const refreshPlayLists = () => {
    try {
      userService
        .getUserPlayLists()
        .then(playlists => {
          debugger;
          if (playlists.length) {
            playlists.map(el => (el.image = defaultSongImage));
          }
          setPlaylists(playlists);
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleCreatePlayList = e => {
    e.preventDefault();
    try {
      userService.createPlayList(playListName);
      userService
        .getUserPlayLists()
        .then(res => {
          debugger;
          res.map(el => (el.image = defaultSongImage));

          setButtonText("Add PlayList");
          setErrorMessage("The playlist has been created");
          setSuccess(true);
          setShowFormAddPlayList(false);
          refreshPlayLists();
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleAddPlaylistClick = () => {
    setButtonText(
      buttonText === "Add PlayList" ? "Close form" : "Add PlayList"
    );
    setShowFormAddPlayList(!showFormAddPlayList);
    setErrorMessage("");
  };

  const handleDeleteClick = id => {
    try {
      userService
        .deletePlayList(id)
        .then(res => {
          res.playLists.map(el => (el.image = defaultSongImage));

          refreshPlayLists();
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handlePlayListClick = id => {
    const local = userService.getLocalFromStorage();
    try {
      userService
        .getUserInfo(local.id, local.token)
        .then(localData => {
          let user = userService.getUserFromData(localData);
          let Playlists = user.Playlists.find(playlist => playlist.id === id);

          Playlists.tracks && setTracks(Playlists.tracks);
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleBackToPlayList = () => setTracks([]);

  const handleDeleteTrack = trackId => {
    const local = userService.getLocalFromStorage();
    try {
      userService
        .getUserInfo(local.id, local.token)
        .then(data => {
          let user = userService.getUserFromData(data);
          user.deleteTrackFromPlayList(trackId);
          userService
            .updateUser(local.id, local.token, user)
            .then(_ => setTracks(tracks.filter(track => track.id !== trackId)))
            .catch(err => console.log(err.message));
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const play = preview => setSongPreview(preview || defaultSongPreview);

  return (
    <>
      <Header showPlayer={isLoggedIn} track={songPreview}></Header>
      {isLoggedIn && (
        <SideTitle
          messageButton={buttonText}
          onClickAddPlayList={handleAddPlaylistClick}
          showAddPlayListButton={true}
          title="Playlists"
        />
      )}
      {isLoggedIn && !showFormAddPlayList && !tracks.length && (
        <List
          onPlayListClick={handlePlayListClick}
          onDeleteClick={handleDeleteClick}
          type="playlist"
          list={playlists}
        />
      )}

      {showFormAddPlayList && (
        <form className="custom-form" onSubmit={handleCreatePlayList}>
          <div className="form-group">
            <label>Add Playlist</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Add PlayList..."
            />
          </div>
          <button style={{ marginLeft: "0" }} type="submit">
            Add Playlist
          </button>
        </form>
      )}
      {tracks.length > 0 && (
        <div>
          <ul className="list playlist-trackList">
            <button onClick={handleBackToPlayList}>Back to PlayList</button>
            {tracks.map(track => (
              <li className="bottom--list--item">
                <div onClick={() => play(track.preview_url)}>{track.name}</div>
                <div>
                  <button onClick={() => handleDeleteTrack(track.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Message
        message={errorMessage}
        clearMessage={clearMessage}
        success={success}
      />
    </>
  );
};

export default MyPlaylists;
