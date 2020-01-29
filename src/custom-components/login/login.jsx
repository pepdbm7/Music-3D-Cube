import React, { useState, useEffect, useContext } from "react";
import userService from "../../services/userlogic";
import playListImage from "../../assets/img/playlist.png";

import Message from "../message";

import { StoreContext } from "../../store";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const clearMessage = () => setErrorMessage("");

  const {
    playlists: [, setPlaylists],

    isLoggedIn: [isLoggedIn, setIsLoggedIn]
  } = useContext(StoreContext);

  useEffect(() => {
    const isUserInStorage = userService.getSessionFromStorage();
    setIsLoggedIn(isUserInStorage);
    getPlaylists(isUserInStorage);
  }, []);

  const handleInputChange = e =>
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });

  const handleLogin = e => {
    e.preventDefault();

    const { username, password } = formValues;

    try {
      userService
        .authenticateUser(username, password)
        .then(() => {
          setIsLoggedIn(true);
          getPlaylists(true);
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const getPlaylists = loggedIn => {
    if (loggedIn) {
      try {
        userService
          .getUserPlayLists()
          .then(playlists => {
            if (playlists.length)
              playlists.map(el => (el.image = playListImage));
            setPlaylists(playlists);
            document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
          })
          .catch(err => err);
      } catch (err) {}
    }
  };

  const goToRegister = () => {
    setFormValues({ username: "", password: "" });
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <section className="top__seccion-button">
      {`Welcome ${formValues.username}, enjoy the app!`}
      <button onClick={handleLogout}>Logout</button>
    </section>
  ) : (
    <form className="custom-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          value={formValues.username}
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={formValues.password}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Login</button>
      <button onClick={goToRegister} type="button">
        Register
      </button>
      <Message message={errorMessage} clearMessage={clearMessage} />
    </form>
  );
};

export default Login;
