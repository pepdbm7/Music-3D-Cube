import React from "react";
import Cubito from "../cubito/cubito";
import logo from "../../assets/img/musiclogo.png";
import concertImage from "../../assets/img/concert-min.jpg";

const Landing = ({ history }) => {
  const onClickEnter = () => {
    history.push("/cube");
  };

  return (
    <div className="box-shadow">
      <img
        className="landing--bg-img"
        src={concertImage}
        alt="party-background"
      />
      <div className="landing--parent">
        <section className="landing--content">
          <h1 className="title--landing">
            <img className="img-logo" src={logo} alt="" /> MusicLab{" "}
          </h1>
          <p className="landing--underlogo"> The Music Laboratory</p>
          <div className="landing--cube">
            <Cubito />
          </div>
          <button className="btn btn-warning" onClick={onClickEnter}>
            Enter
          </button>
        </section>
      </div>
    </div>
  );
};

export default Landing;
