import React from "react";
import Landscape from "./Landscape";
import Trucks from "./Trucks";
import Boats from "./Boats";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Trucks />
      <Boats />
    </div>
  );
}

export default World;
