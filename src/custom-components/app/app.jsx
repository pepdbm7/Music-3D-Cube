import React, { useState, useEffect } from "react";
import Cube from "../cube/cube";
import { Switch, Route, withRouter } from "react-router-dom";
import Landing from "../landing/landing";

const App = ({ history }) => {
  let [xdeg, setXdeg] = useState(0);
  let [ydeg, setYdeg] = useState(0);

  useEffect(() => {
    document.onkeyup = ev => cubeControler(ev.keyCode);
  }, []);

  const cubeControler = keyCode => {
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
  };

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" render={() => <Landing history={history} />} />
        <Route path="/cube" render={() => <Cube xdeg={xdeg} ydeg={ydeg} />} />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(App);
