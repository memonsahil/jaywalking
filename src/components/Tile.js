import React from "react";

function Tile({ alt, src, x, y, z }) {
  return (
    <img
      className="tile"
      src={src}
      alt={alt}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: z,
      }}
    />
  );
}

export default Tile;
