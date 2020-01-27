import React, { useState, useEffect } from "react";
import Login from "../../login/login";
import Header from "../../header/header";
import userService from "../../../services/userlogic";

const TopSide = ({ onLogin, onLogout, onClickRegister }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isUserInStorage = userService.getSessionFromStorage();
    setIsLogged(isUserInStorage);
    onLogin(isUserInStorage);
  }, []);

  const handleLogin = ({ username, password }) => {
    userService
      .authenticateUser(username, password)
      .then(data => {
        sessionStorage.setItem("user", JSON.stringify(data));
        setIsLogged(true);
        onLogin(true);
      })
      .catch(err => setErrorMessage(err.message));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogged(false);
    onLogout();
  };

  return (
    <section className="top">
      <Header />
      {isLogged ? (
        <section className="top__seccion-button">
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        </section>
      ) : (
        <Login
          message={errorMessage}
          onClickRegister={onClickRegister}
          onLogin={handleLogin}
        ></Login>
      )}
    </section>
  );
};

export default TopSide;
