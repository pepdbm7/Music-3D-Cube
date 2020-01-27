import React from "react";
import DefaultArtistImage from "../../assets/img/playlist.png";

const List = ({
  isLogged,
  list,
  playLists,
  trackFoundInPlayListMessage,
  type,
  onPlayListClick,
  onAlbumClick,
  onAlbums,
  onPlayTrack,
  onDeleteClick,
  onClickAddTrackToList
}) => {
  const handleClick = id => {
    switch (type) {
      case "playlist":
        onPlayListClick(id);
        break;
      case "tracks":
        onAlbumClick(id);
        break;
      case "albums":
        onAlbums(id);
        break;
      case "songs":
        let track = list.find(el => {
          return el.id === id;
        });
        let preview_url = !track.preview_url
          ? require("../../assets/audio/default.mp3")
          : track.preview_url;
        onPlayTrack(preview_url);
        break;

      default:
        break;
    }
  };

  return (
    <section className="list">
      <ul className="list__container">
        {list.map((item, i) => (
          <li className="list__container__item" key={i}>
            <div className="list__container__item__group">
              <div className="list__container__item__group__img">
                <img src={item.image || DefaultArtistImage} alt="itemPic"></img>
              </div>
              <div
                onClick={() => handleClick(item.id)}
                className="list__container__item__group__name"
              >
                {item.name}
              </div>
              {type === "playlist" && (
                <div>
                  <button
                    onClick={() => onDeleteClick(item.id)}
                    className="list__container__item__group__button-delete btn btn-sm btn-dark"
                  >
                    Delete
                  </button>
                </div>
              )}
              {type === "songs" && isLogged && (
                <div>
                  <button
                    id={`button-${item.id}`}
                    onClick={() => onClickAddTrackToList(item.id)}
                    className="list__container__item__group__button-delete btn btn-sm btn-dark"
                  >
                    Add To PlayList
                  </button>
                </div>
              )}
            </div>
            {type === "songs" && (
              <div
                id={item.id}
                className="display-none list__container__item__playlists"
              >
                <ul className="list__container__item__playlists-list">
                  {playLists.map(playlist => (
                    <li onClick={() => onPlayListClick(item.id, playlist.id)}>
                      {playlist.name}
                    </li>
                  ))}
                </ul>
                <div className="list__container__item__playlists-message">
                  {trackFoundInPlayListMessage}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default List;
