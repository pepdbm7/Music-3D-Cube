import React from "react";
import defaultLogoImage from "../../assets/img/musiclogo.png";

const Header = ({ showPlayer, track }) => (
  <header className="header">
    <div className="header__logo">
      <img className="img-logo" src={defaultLogoImage} alt="logo" />{" "}
      <p className="logo"> MusicLab</p>
    </div>
    {showPlayer && (
      <audio src={track} className="header__audio" controls autoPlay></audio>
    )}
  </header>
);
export default Header;
