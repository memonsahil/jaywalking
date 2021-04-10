import React from "react";
import Landscape from "./Landscape";
import Trucks from "./Trucks";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Trucks />
    </div>
  );
}

export default World;
