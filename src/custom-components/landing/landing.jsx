import React from "react";
import Cubito from "../cubito/cubito";
import logo from "../../assets/img/musiclogo.png";
import concertImage from "../../assets/img/concert-min.jpg";

const Landing = ({ history }) => {
  const onClickEnter = () => {
    history.push("/cube");
  };

  return (
    <>
      <img
        className="landing__bg-img"
        src={concertImage}
        alt="party-background"
      />
      <div className="landing__content">
        <h1 className="landing__title">
          <img className="img-logo" src={logo} alt="logo" /> MusicLab
        </h1>
        <p className="landing__subtitle"> Your Music Laboratory</p>
        <div className="landing__cube">
          <Cubito />
        </div>
        <button className="landing__button" onClick={onClickEnter}>
          Enter
        </button>
      </div>
    </>
  );
};

export default Landing;
