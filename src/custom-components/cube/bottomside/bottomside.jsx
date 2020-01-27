import React, { useState } from "react";
import Register from "../../register/register";
import Header from "../../header/header";
import userService from "../../../services/userlogic";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import defaultSongPreview from "../../../assets/audio/default.mp3";
import defaultSongImage from "../../../assets/img/playlist.png";

const BottomSide = ({
  isLogged,
  playlists,
  OnCreatedPlayList,
  onClickLogin
}) => {
  const [playListName, setPlayListName] = useState("");
  const [songPreview, setSongPreview] = useState("");
  const [tracks, setTracks] = useState(false);
  const [showFormAddPlayList, setShowFormAddPlayList] = useState(false);
  const [messageButton, setMessageButton] = useState("Add PlayList");
  const [registerPlaylistMessage, setRegisterPlaylistMessage] = useState("");

  const handleChange = ev => {
    setPlayListName(ev.target.value);
  };

  const handleCreatePlayList = ev => {
    userService.createPlayList(playListName);
    userService
      .getUserPlayLists()
      .then(res => {
        res.map(el => (el.image = defaultSongImage));

        setMessageButton("Add PlayList");
        setRegisterPlaylistMessage("The playlist has been created");
        setShowFormAddPlayList(false);
        OnCreatedPlayList();
      })
      .catch(err => {
        setRegisterPlaylistMessage(err.message);
      });
  };

  const handleAddPlaylistClick = () => {
    setMessageButton(
      messageButton === "Add PlayList" ? "Close form" : "Add PlayList"
    );
    setShowFormAddPlayList(!showFormAddPlayList);
    setRegisterPlaylistMessage("");
    setShowFormAddPlayList(showFormAddPlayList);
  };

  const handleDeleteClick = id => {
    userService
      .deletePlayList(id)
      .then(res => {
        res.playLists.map(el => (el.image = defaultSongImage));

        OnCreatedPlayList();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const handlePlayListClick = id => {
    const session = userService.getSessionFromStorage();
    userService
      .getUserInfo(session.id, session.token)
      .then(sessionData => {
        let user = userService.getUserFromData(sessionData);
        let Playlists = user.Playlists.find(playlist => playlist.id === id);

        Playlists.tracks && setTracks(Playlists.tracks);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const handleBackToPlayList = () => setTracks([]);

  const handleDeleteTrack = trackId => {
    const session = userService.getSessionFromStorage();
    userService
      .getUserInfo(session.id, session.token)
      .then(data => {
        let user = userService.getUserFromData(data);
        user.deleteTrackFromPlayList(trackId);
        userService
          .updateUser(session.id, session.token, user)
          .then(_ => setTracks(tracks.filter(track => track.id !== trackId)))
          .catch(err => console.log(err.message));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const play = preview => setSongPreview(preview || defaultSongPreview);

  return (
    <section className="bottom">
      <div className="rotateX-180">
        <Header showPlayer={isLogged} track={songPreview}></Header>
        {isLogged && (
          <SideTitle
            messageButton={messageButton}
            onClickAddPlayList={handleAddPlaylistClick}
            showAddPlayListButton={true}
            title="Playlists"
          ></SideTitle>
        )}
        {isLogged && !showFormAddPlayList && !tracks.length && (
          <List
            onPlayListClick={handlePlayListClick}
            onDeleteClick={handleDeleteClick}
            type="playlist"
            list={playlists}
          ></List>
        )}
        {!isLogged && <Register onClickLogin={onClickLogin}></Register>}
        {showFormAddPlayList && (
          <form className="custom-form" onSubmit={handleCreatePlayList}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Add Playlist</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Add PlayList..."
              />
            </div>
            <button
              style={{ "margin-left": "0" }}
              type="submit"
              className="btn btn-primary"
            >
              Add Playlist
            </button>
            <h2>{registerPlaylistMessage}</h2>
          </form>
        )}
        {tracks.length > 0 && (
          <div className="">
            <ul className="list playlist-trackList">
              <button
                className="back-btn btn btn-md btn-dark"
                onClick={handleBackToPlayList}
              >
                Back to PlayList
              </button>
              {tracks.map(track => (
                <li className="bottom--list--item">
                  <div onClick={() => play(track.preview_url)}>
                    {track.name}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-dark"
                      onClick={() => handleDeleteTrack(track.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className=""></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BottomSide;
