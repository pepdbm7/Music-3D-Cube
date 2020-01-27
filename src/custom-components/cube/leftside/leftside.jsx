import React, { useState, useEffect } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import userService from "../../../services/userlogic";
import $ from "jquery";
import defaultPlaylistImage from "../../../assets/img/playlist.png"

const LeftSide = ({isLogged, track, tracks}) => {
  state = {
    playLists: [],
    isLogged: false,
    logo: "",
    tracks: [],
    track: "",
    trackFoundInPlayListMessage: ""
  };

  componentWillReceiveProps(props) {
    let tracks = props.tracks.map(el => {
      el.image = !el.image
        ? defaultPlaylistImage
        : el.image;
      return el;
    });
    let back = !tracks.length ? "" : tracks[0].image;
    setState({ isLogged: props.isLogged, logo: back, tracks: tracks });
  }

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    console.log(props.track)
  }, [props.track])

  const handlePlayTrack = previewUrl => {
    setState({ track: previewUrl });
  };

  const getUserInfo = () => {
    const session = userService.getSessionFromStorage();
    return userService
      .getUserInfo(session.id, session.token)
      .then(data => {
        return data;
      })
      .catch(err => {
        throw Error(err.message);
      });
  };

  const handlePlaylistClick = (trackId, playListId) => {
    getUserInfo()
      .then(data => {
        if (userService.existsTrackInPlayList(data, trackId)) {
          setState(
            {
              trackFoundInPlayListMessage:
                "This track is already in the playList"
            },
            () => {
              setTimeout(() => {
                setState({
                  trackFoundInPlayListMessage: "",
                  hiddePlayListDiv: "playListId"
                });
              }, 2000);
            }
          );
        } else return data;
      })
      .then(data => {
        if (data) {
          let user = userService.getUserFromData(data);
          return userService.addTrackToPlayList(trackId, playListId, user);
        } else return data;
      })
      .then(res => {
        if (res)
          setState(
            {
              trackFoundInPlayListMessage:
                "This track has been added to the playList"
            },
            () => {
              setTimeout(() => {
                setState({ trackFoundInPlayListMessage: "" });
              }, 2000);
            }
          );
      })
      .catch(err => alert(err.message));
  };

  const handleAddTrackToListClickButton = trackId => {
    //$("button[id^='button-']").

    const text = $("#button-" + trackId).text();

    if (text === "Close") {
      $(`#${trackId}`).addClass("display-none");
      $("#button-" + trackId).text("Add To PlayList");
    } else {
      getUserInfo()
        .then(data => {
          if (data.playLists.length)
            setState({ playLists: data.playLists }, () => {
              $(`#${trackId}`).removeClass("display-none");
              $("#button-" + trackId).text("Close");
            });
          else {
            alert("The user has not any playList");
          }
        })
        .catch(err => alert(err.message));
    }
  };

    return (
      <section className="left">
        <div className="rotateY--180">
          <Header track={state.track} showPlayer={true} />
          <SideTitle logo={state.logo} title="Track List" />
          <List
            trackFoundInPlayListMessage={state.trackFoundInPlayListMessage}
            playLists={state.playLists}
            onClickAddTrackToList={handleAddTrackToListClickButton}
            onPlayListClick={handlePlaylistClick}
            isLogged={state.isLogged}
            onPlayTrack={handlePlayTrack}
            showLink={true}
            type="songs"
            list={state.tracks}
          />
        </div>
      </section>
    );
}

export default LeftSide