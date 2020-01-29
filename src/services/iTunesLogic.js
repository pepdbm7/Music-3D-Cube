import utils from "../utils";

const iTunesLogic = {
  token:
    "BQBWsN1G_QqArpMcAhJY0VNn26DqvxqNSZSVpnXC3iuBD-fNrSk-R2GBVxO9gbnAag47CbH4otJSsU7988d_ESM_hB75WR_fzuE-rX6hN1fF5gMLGODaIvKtpTKC3KBR4UOBmRfSZtwD-JM0UfD7Yuyr1m-UJa-brnW92Uia1HI6VL30xO1nx6jX4vxkwGjODdMP59myucB5dNvmknEb2w",

  getArtists(query) {
    if (typeof query !== "string")
      throw TypeError(`${query} is not a a string`);
    if (!query.trim()) throw Error("Please, write an artist name");

    const url = new URL("https://itunes.apple.com/search");
    const params = { term: query, media: "music", limit: 10 };
    url.search = new URLSearchParams(params);

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(({ error, results }) => {
        let artists = [];
        if (error) throw Error(error.message);
        if (!results.length) {
          throw Error("No artists found, try another name");
        } else {
          results.map(artist =>
            artists.push({
              id: artist.artistId,
              name: artist.artistName,
              image: artist.artworkUrl60 || ""
            })
          );
          return artists;
        }
      })
      .then(artists => utils.removeDuplicates(artists));
  },

  getAlbumsByArtistId(artistId) {
    if (typeof artistId !== "number")
      throw TypeError(`${artistId} is not a a number`);

    const url = new URL(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=10`
    );

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(({ error, results }) => {
        let albums = [];
        if (error) throw Error(error.message);
        if (!results.length) {
          throw Error("No albums found, try another artist");
        } else {
          results.map(item => {
            return (
              item.collectionType === "Album" &&
              albums.push({
                id: item.collectionId || "",
                name: item.collectionName || "",
                image: item.artworkUrl100 || ""
              })
            );
          });
          return albums;
        }
      })
      .then(albums => utils.removeDuplicates(albums));
  },

  getSongsbyAlbumId(albumId) {
    if (typeof albumId !== "number")
      throw TypeError(`${albumId} is not a a number`);

    const url = new URL(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
    );

    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(({ error, results }) => {
        let songs = [];
        if (error) throw Error(error.message);
        if (!results.length) {
          throw Error("No songs found, try another album");
        } else {
          results.map(item => {
            return (
              item.kind === "song" &&
              songs.push({
                id: item.trackId,
                name: item.trackName || "",
                preview_url: item.previewUrl || "",
                image: item.artworkUrl100 || ""
              })
            );
          });
          return songs;
        }
      })
      .then(songs => utils.removeDuplicates(songs));
  },

  setSongsImage(songs, albumImage) {
    return songs.map(song => ({
      ...song,
      image: albumImage
    }));
  }
};

export default iTunesLogic;

// module.exports = iTunesLogic
