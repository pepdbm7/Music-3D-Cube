require("isomorphic-fetch");

const { expect } = require("chai");

const logic = require("./iTunesLogic");

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe("iTunesLogic", () => {
  describe("getArtists", () => {
    it("should succeed on retrieving correct artist", () => {
      return logic.getArtists(query).then(res => {
        expect(res.name).to.equal("Jamiroquai");
      });
    });

    it("should throw correct error on non-string id (object)", () => {
      let query = {};
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (array)", () => {
      let query = [];
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (boolean)", () => {
      let query = true;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (number)", () => {
      let query = 123;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (undefined)", () => {
      let query = undefined;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (null)", () => {
      let query = null;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on empty id", () => {
      let query = "";
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is empty or blank`);
      }
    });
  });

  describe("getTrack", () => {
    it("should retrieve the correct track", () => {
      let id = "5CQ30WqJwcep0pYcV4AMNc";
      return logic.getTrack(id).then(track => {
        expect(track).not.to.be.undefined;
        expect(track.name).to.equal("Stairway To Heaven");
        expect(track.id).to.equal("5CQ30WqJwcep0pYcV4AMNc");
      });
    });
  });

  describe("getArtists", () => {
    it("should succesfully search", () => {
      return logic.getArtists("Jamiroquai").then(res => {
        expect(res).not.to.be.undefined;
        expect(res.artists.items[0].name).to.equal("Jamiroquai");
      });
    });

    it("should throw correct error on non-string id (object)", () => {
      let id = {};
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (array)", () => {
      let id = [];
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (boolean)", () => {
      let id = true;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (number)", () => {
      let id = 123;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (undefined)", () => {
      let id = undefined;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on non-string id (null)", () => {
      let id = null;
      try {
        logic.getArtists(query);
      } catch (err) {
        expect(err.message).to.equal(`${id} is not a a string`);
      }
    });

    it("should throw correct error on empty query", () => {
      try {
        logic.getArtists("");
      } catch (err) {
        expect(err.message).to.equal("query cannot be empty");
      }
    });
  });

  describe("getPlaylistsTracks", () => {
    // let id = "0AUisiV8Q5KcZ41nPOhrIr";
    // it("should succeed on retrieving tracks of a playlist", () => {
    //   return logic.getPlaylistsTracks(id).then(res => {
    //     expect(res.items).not.to.be.undefined;
    //     expect(res.href).to.equal(
    //       "https://api.spotify.com/v1/playlists/0AUisiV8Q5KcZ41nPOhrIr/tracks?offset=0&limit=100"
    //     );
    //   });
    // });
    // it("should throw correct error on non-string id (object)", () => {
    //   let id = {};
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on non-string id (array)", () => {
    //   let id = [];
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on non-string id (boolean)", () => {
    //   let id = true;
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on non-string id (number)", () => {
    //   let id = 123;
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on non-string id (undefined)", () => {
    //   let id = undefined;
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on non-string id (null)", () => {
    //   let id = null;
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is not a a string`);
    //   }
    // });
    // it("should throw correct error on empty id", () => {
    //   let id = "";
    //   try {
    //     logic.getPlaylistsTracks(id);
    //   } catch (err) {
    //     expect(err.message).to.equal(`${id} is empty or blank`);
    //   }
    // });
  });

  describe("getAlbumsByArtistId", () => {
    let id = "1419227";
    it("should succeed on retrieving correct albums", () =>
      logic.getAlbumsByArtistId(id).then(res => {
        expect(res.results.length).to.equal(20);
      }));
    it("should return custom message on invalid Id", () => {
      id = "12345";
      return logic.getAlbumsByArtistId(id).then(res => {
        expect(res).to.equal("Any album found of selected artist");
      });
    });
    it("should return custom message on 0 results found", () => {
      id = "12345";
      return logic.getAlbumsByArtistId(id).then(res => {
        expect(res).to.equal("Any album found of selected artist");
      });
    });
  });

  describe("getSongsbyAlbumId", () => {
    let id = "1xQq0txMTpstjFUwp4c4E0";
    it("should succeed on retrieving correct tracks from album", () => {
      return logic.getSongsbyAlbumId(id).then(res => {
        expect(res.items[1].name).to.equal("Automaton");
      });
    });
  });

  describe("createPlaylist", () => {
    //   let name = "Playlist Test 2";
    //   let description = "Description of the playlist";
    //   it("should succeed on creating a playlist", () => {
    //     return logic.createPlaylist(name, description).then(res => {
    //       expect(res.name).to.equal(name);
    //       return res;
    //     });
    //   });
  });
});
