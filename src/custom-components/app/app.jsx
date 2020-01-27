import React, { useState, useEffect } from "react";
import Cube from "../cube/cube";
import { Route, withRouter } from "react-router-dom";
import Landing from "../landing/landing";

const App = ({ history }) => {
  const [image, setImage] = useState("");
  let [xdeg, setXdeg] = useState(0);
  let [ydeg, setYdeg] = useState(-90);

  const handleClickButtonLanding = () => {
    history.push("/cube");
  };

  const cubeControler = keyCode => {
    console.log("antes:", xdeg);
    switch (keyCode) {
      case 38: //UP
        if (ydeg > -90) setYdeg((ydeg -= 90));
        break;

      case 40: //DOWN
        if (ydeg < 90) setYdeg((ydeg += 90));
        break;

      case 39: //RIGHT
        setXdeg((xdeg -= 90));
        break;

      case 37: //LEFT
        setXdeg((xdeg += 90));
        break;

      default:
        break;
    }
    console.log("después:", xdeg);
  };

  useEffect(() => {
    document.onkeyup = ev => cubeControler(ev.keyCode);
  }, []);

  useEffect(() => {
    xdeg !== -270 && ydeg !== 0 ? setImage("") : setImage(image);
  }, [image, xdeg, ydeg]);

  const setBackGround = albumImg => {
    setImage(albumImg);
  };

  return (
    <div>
      <div
        className="back-image"
        style={{
          filter: image && `blur(6px)`,
          opacity: image && 0.7,
          backgroundImage: `url(${image})`
        }}
      ></div>
      <Route
        exact
        path="/"
        render={() => (
          <Landing onClickEnter={handleClickButtonLanding}></Landing>
        )}
      />
      <Route
        path="/cube"
        render={() => (
          <Cube xdeg={xdeg} ydeg={ydeg} setBackGround={setBackGround}></Cube>
        )}
      />
    </div>
  );
};

export default withRouter(App);
