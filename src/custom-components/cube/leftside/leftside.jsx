import React, { useState, useContext } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import userService from "../../../services/userlogic";
import Message from "../../message";
//store:
import { StoreContext } from "../../../store";

const LeftSide = () => {
  const [currentTrackPlaying, setCurrentTrackPlaying] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearMessage = () => setErrorMessage("");

  const {
    playlists: [playlists, setPlaylists],
    isLoggedIn: [isLoggedIn],
    albumImage: [albumImage],
    albumTracks: [albumTracks]
  } = useContext(StoreContext);

  const handlePlayTrack = previewUrl => setCurrentTrackPlaying(previewUrl);

  const getUserInfo = () => {
    const local = userService.getLocalFromStorage();
    try {
      userService
        .getUserInfo(local.id, local.token)
        .then(data => {
          return data;
        })
        .catch(err => {
          throw Error(err.message);
        });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handlePlaylistClick = (trackId, playListId) => {
    getUserInfo()
      .then(userData => {
        const existsTrackInList = userService.existsTrackInPlayList(
          userData,
          trackId
        );
        return existsTrackInList
          ? setErrorMessage("This track is already in the playList")
          : userData;
      })
      .then(userData => {
        if (userData) {
          let user = userService.getUserFromData(userData);
          return userService.addTrackToPlayList(trackId, playListId, user);
        }
      })
      .then(
        added =>
          added === true &&
          setErrorMessage("Successfully added to the playList!")
      )
      .catch(err => setErrorMessage(err.message));
  };

  const addTrackToPlaylist = trackId => {
    const text = document.getElementById("#button-" + trackId).text();

    if (text === "Close") {
      document.getElementById(`#${trackId}`).addClass("display-none");
      document.getElementById("#button-" + trackId).text("Add To PlayList");
      return true;
    }
    return getUserInfo()
      .then(userData => {
        if (userData.playLists) {
          setPlaylists(userData.playLists);
          document.getElementById(`#${trackId}`).removeClass("display-none");
          document.getElementById("#button-" + trackId).text("Close");
          return true;
        }

        return setErrorMessage("You don't have any playList yet");
      })
      .catch(err => alert(err.message));
  };

  return (
    <section className="left">
      <div className="rotateY--180">
        <div
          className="background__image"
          style={{
            opacity: albumImage && 0.2,
            backgroundImage: albumImage && `url(${albumImage})`
          }}
        />
        <Header track={currentTrackPlaying} showPlayer={true} />
        <SideTitle title="Track List" />
        <List
          playLists={playlists}
          addTrackToPlaylist={addTrackToPlaylist}
          onPlayListClick={handlePlaylistClick}
          isLogged={isLoggedIn}
          onPlayTrack={handlePlayTrack}
          showLink={true}
          type="songs"
          list={albumTracks}
        />
        <Message message={errorMessage} clearMessage={clearMessage} />
      </div>
    </section>
  );
};

export default LeftSide;
