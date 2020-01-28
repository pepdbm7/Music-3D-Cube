import React, { useEffect } from "react";
import defaultArtistImage from "../../assets/img/playlist.png";
import defaultSong from "../../assets/audio/default.mp3";

const List = ({
  isLogged,
  list,
  playLists,
  type,
  onPlayListClick,
  onAlbumClick,
  onAlbums,
  onPlayTrack,
  onDeleteClick,
  addTrackToPlaylist
}) => {
  useEffect(() => console.log("songs received from list: ", list), [list]);

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
        let clickedTrack = list.find(el => el.id === id);
        let preview_url = clickedTrack.preview_url || defaultSong;
        onPlayTrack(preview_url);
        break;

      default:
        break;
    }
  };

  return (
    <section className="list">
      <ul className="list__container">
        {list.length
          ? list.map((item, i) => (
              <li className="list__container__item" key={i}>
                <div className="list__container__item__group">
                  <div className="list__container__item__group__img">
                    <img
                      src={item.image || defaultArtistImage}
                      alt="itemPic"
                    ></img>
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
                        onClick={() => addTrackToPlaylist(item.id)}
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
                      {playLists.length
                        ? playLists.map(playlist => (
                            <li
                              onClick={() =>
                                onPlayListClick(item.id, playlist.id)
                              }
                            >
                              {playlist.name}
                            </li>
                          ))
                        : null}
                    </ul>
                    <div className="list__container__item__playlists-message"></div>
                  </div>
                )}
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default List;
