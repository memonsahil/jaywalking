import React from "react";

function Tile({ src, x, y, z }) {
  return (
    <>
      <img
        className="tile"
        src={src}
        style={{
             //height: "5%",
             //width: "5%",
             left: `${x}%`, 
             top: `${y}%`, 
             zIndex: z 
            }}
      />
    </>
  );
}

export default Tile;
