import React from "react";
import Landscape from "./Landscape";
import Trucks from "./Trucks";
import Boats from "./Boats";
import Character from "./Character";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Trucks />
      <Boats />
      <Character />
    </div>
  );
}

export default World;
