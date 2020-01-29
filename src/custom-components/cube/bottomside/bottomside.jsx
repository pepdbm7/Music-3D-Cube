import React, { useContext } from "react";
import Register from "../../register/register";

import Myplaylists from "../../myplaylists";

import { StoreContext } from "../../../store";

const BottomSide = () => {
  const {
    isLoggedIn: [isLoggedIn]
  } = useContext(StoreContext);

  return (
    <section className="bottom">
      <div className="rotateX-180">
        {!isLoggedIn ? <Register /> : <Myplaylists />}
      </div>
    </section>
  );
};

export default BottomSide;
