import React, { useState, useEffect } from "react";
//components:
import FrontSide from "./frontside/frontside";
import BackSide from "./backside/backside";
import BottomSide from "./bottomside/bottomside";
import TopSide from "./topside/topside";
import RightSide from "./rightside/rightside";
import LeftSide from "./leftside/leftside";

//utils:
import useWindowSize from "../../utils/useWindowSize";

const Cube = ({ xdeg, ydeg }) => {
  const [cubeSize, setCubeSize] = useState(0);

  const windowSize = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      windowSize.width > 1040 && setCubeSize(1);
    }, 500);
  }, []);

  useEffect(() => {
    if (windowSize.width > 1040) setCubeSize(1);
    else {
      if (windowSize.width > 768) {
        setCubeSize(0.7);
      } else {
        setCubeSize(0.4);
      }
    }
  }, [windowSize.width]);

  return (
    <section className="container">
      <section
        style={{
          transform: `rotateY(${xdeg}deg) rotateX(${ydeg}deg) scale3d(${cubeSize}, ${cubeSize}, ${cubeSize})`
        }}
        className="cube"
      >
        <FrontSide />
        <BackSide />
        <LeftSide />
        <RightSide />
        <TopSide />
        <BottomSide />
      </section>
    </section>
  );
};

export default Cube;
