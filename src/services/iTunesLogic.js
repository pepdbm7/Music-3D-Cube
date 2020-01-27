const iTunesLogic = {
  token:
    "BQBWsN1G_QqArpMcAhJY0VNn26DqvxqNSZSVpnXC3iuBD-fNrSk-R2GBVxO9gbnAag47CbH4otJSsU7988d_ESM_hB75WR_fzuE-rX6hN1fF5gMLGODaIvKtpTKC3KBR4UOBmRfSZtwD-JM0UfD7Yuyr1m-UJa-brnW92Uia1HI6VL30xO1nx6jX4vxkwGjODdMP59myucB5dNvmknEb2w",

  /**
   *
   * @param {*} id The artist's at Spotify
   *
   * @throws {Error in case of non-string id}
   * @throws {Error in case of empty or blank id}
   * @throws {Error in case of wrong id}
   *
   */

  getArtists(query) {
    if (typeof query !== "string")
      throw TypeError(`${query} is not a a string`);
    if (!query.trim().length) throw Error("query cannot be empty");

    const url = new URL("https://itunes.apple.com/search");
    const params = { term: query, media: "music", entity: "musicArtist" };
    url.search = new URLSearchParams(params);

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(jsondata => {
        let artists = [];
        if (jsondata && jsondata.error) throw Error(jsondata.error.message);
        jsondata.results &&
          jsondata.results.map(artist =>
            artists.push({
              id: artist.artistId,
              name: artist.artistName,
              image: ""
            })
          );
        return artists;
      })
      .catch(err => {
        throw Error(err.message);
      });
  },

  getAlbumsByArtistId(artistId) {
    console.log(artistId);
    if (typeof artistId !== "number")
      throw TypeError(`${artistId} is not a a number`);

    const url = new URL(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
    );

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(jsondata => {
        let albums = [];
        if (jsondata.error) throw Error(jsondata.error.message);

        jsondata.results &&
          jsondata.results.map(item => {
            if (item.collectionType === "Album")
              albums.push({
                id: item.collectionId || "",
                name: item.collectionName || "",
                image: item.artworkUrl100 || ""
              });
            return true;
          });

        return albums;
      });
  },

  getSongsbyAlbumId(albumId) {
    if (typeof albumId !== "number")
      throw TypeError(`${albumId} is not a a number`);

    const url = new URL(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
    );

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(jsondata => {
        let songs = [];
        if (jsondata && jsondata.error) throw Error(jsondata.error.message);

        jsondata.results &&
          jsondata.results.map(item => {
            item.kind === "song" &&
              songs.push({
                id: item.id,
                name: item.trackName || "",
                preview_url: item.previewUrl || "",
                image: item.artworkUrl100 || ""
              });
            return true;
          });

        return songs;
      });
  }

  //   getPlaylistsTracks(playlistId) {
  //     if (!(typeof playlistId === "string"))
  //       throw TypeError(`${playlistId} is not a a string`);
  //     if (!playlistId.trim().length)
  //       throw Error(`${playlistId} is empty or blank`);

  //     return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: "Bearer " + this.token
  //       }
  //       // body: JSON.stringify({ name, surname, username, password })
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         if (res.error) throw Error(res.error.message);
  //         else return res;
  //       });
  //   },

  //   createPlaylist(name) {
  //     return fetch(`https://api.spotify.com/v1/me/playlists`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: "Bearer " + this.token
  //       },
  //       body: JSON.stringify({ name: name })
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         if (res.error) throw res.error;
  //         else return res;
  //       });
  //   },

  //   //id, name, preview_url, picture

  //   getTrack(id) {
  //     return fetch(`https://api.spotify.com/v1/tracks/${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: "Bearer " + this.token
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         if (res.error) throw Error(res.error.message);

  //         const track = {};
  //         track.id = res.id;
  //         track.name = res.name;
  //         track.preview_url = res.preview_url;
  //         track.image = res.album.images
  //           ? res.album.images[0].url
  //           : "https://i.scdn.co/image/557a6058e3de72bf37ffcd2c12dd5932276df344";
  //         return track;
  //       });
  //   }
};

export default iTunesLogic;

// module.exports = iTunesLogic
