// const iTunesLogic = require('../services/iTunesLogic')
// const {User, Playlist, Track} = require('../datalayer/user')
// let localStorage = require('localStorage')

//comentar para testear:
import data from "../datalayer/user";
import iTunesLogic from "../services/iTunesLogic";
require("isomorphic-fetch");
const uuidv1 = require("uuid/v1");
const { User, Track, Playlist } = data;

const userService = {
  getLocalFromStorage() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined) throw Error("The user has not local");
    else return user;
  },

  registerUser({ name, surname, email, username, password }) {
    let user = new User();
    user.Email = email;
    user.Name = name;
    user.surname = surname;
    user.username = username;
    user.password = password;

    return fetch("https://skylabcoders.herokuapp.com/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())

      .then(res => {
        if (res.error) throw Error(res.error);

        return true;
      });
  },

  getUserFromData(data) {
    return User.createUserFromData(data);
  },

  authenticateUser(username, password) {
    if (typeof username !== "string")
      throw TypeError(`username is not a string`);
    if (typeof password !== "string")
      throw TypeError(`pasword is not a string`);
    if (!username.trim().length) throw TypeError(`username is empty`);
    if (!password.trim().length) throw TypeError(`password is empty`);

    return fetch("https://skylabcoders.herokuapp.com/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ username, password })
    })
      .then(user => user.json())
      .then(({ data, error }) => {
        if (error) throw Error(error);

        return { id: data.id, token: data.token };
      })
      .then(data => localStorage.setItem("user", JSON.stringify(data)));
  },

  getUserInfo(id, token) {
    if (typeof id !== "string") throw TypeError(`id is not a string`);
    if (typeof token !== "string") throw TypeError(`token is not a string`);
    if (!id.trim()) throw TypeError(`id is empty`);
    if (!token.trim()) throw TypeError(`token is empty`);

    return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
      mehtod: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(({ status, data, error }) => {
        if (status === "OK") {
          return data;
        } else throw Error(error);
      });
  },

  updateUser(id, token, user) {
    debugger;
    return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    }).then(res => {
      debugger;
      return res.json();
    });
    // .then(res => res.status === "OK" && true);
  },

  createPlayList(playlistName) {
    if (typeof playlistName !== "string")
      throw TypeError(`Playlist name is not a string`);
    if (typeof playlistName !== "string")
      throw TypeError(`Playlist name is empty`);
    const local = JSON.parse(localStorage.getItem("user"));
    if (!local) throw Error("The session of the user has fisnihed");

    let playList = new Playlist();
    playList.Id = uuidv1();
    playList.Name = playlistName;
    playList.Image = "whatever.png";

    //retrieve userInfo, and check if already exists playlist:
    return this.getUserInfo(local.id, local.token)
      .then(userInfo => {
        const isNameAlreadyTaken = userInfo.playLists.find(
          playlist => playlist.name === playList.Name
        );
        if (isNameAlreadyTaken)
          throw Error(
            `A playlist with the name${playList.Name} already exists `
          );
        const newInfo = userInfo;

        newInfo.playLists.push(playList);
        return newInfo;
      })
      .then(userInfo => {
        let newUser = new User();
        // newUser.Name = userInfo.name;
        // newUser.Surname = userInfo.surname;
        // newUser.Email = userInfo.email;
        // newUser.Username = userInfo.username;
        newUser.playLists = userInfo.playLists;
        this.updateUser(local.id, local.token, newUser);
      });
  },

  addTrackToPlayList(trackId, playlistId, user) {
    return iTunesLogic
      .getTrack(trackId)
      .then(data => {
        let track = Track.createTrackFromData(data);
        return track;
      })
      .then(track => {
        let playList = user.playLists.find(
          playList => playList.id === playlistId
        );
        playList.tracks.push(track);
        const local = this.getLocalFromStorage();
        return this.updateUser(local.id, local.token, user);
      });
  },

  existsTrackInPlayList(data, trackId) {
    let user = new User();
    for (let p in data) {
      user[p] = data[p];
    }
    return user.existsTrackInPlayList(trackId);
  },

  getUserPlayLists() {
    const local = JSON.parse(localStorage.getItem("user"));
    if (!local) throw Error("The session of the user has fisnished");

    return this.getUserInfo(local.id, local.token).then(res => res.playLists);
  },

  deletePlayList(playlistId) {
    const { id, token } = JSON.parse(localStorage.getItem("user"));
    if (!id) throw Error("The session of the user has fisnihed");
    return this.getUserInfo(id, token)
      .then(res => {
        res.playLists = res.playLists.filter(el => el.id !== playlistId);
        return res;
      })
      .then(user => {
        return this.updateUser(id, token, user).then(res => {
          return user;
        });
      });
  }
};

// descomentar para la aplicacion
export default userService;

//descomentar para test
// module.exports = userService
