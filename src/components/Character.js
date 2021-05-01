import React from "react";
import { atom, useRecoilValue } from "recoil";
import {
  skull,
  characterNE,
  characterNW,
  characterSE,
  characterSW,
} from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function Character() {
  const characterState = atom({
    key: "characterState",
    default: {
      x: 4,
      y: 8,
      dir: "up",
      dead: false,
    },
  });

  const { x, y, dir } = useRecoilValue(characterState);

  let src;
  if (character.dead) {
    src = skull;
  } else if (dir === "up") {
    src = characterNE;
  } else if (dir === "down") {
    src = characterSW;
  } else if (dir === "left") {
    src = characterNW;
  } else if (dir === "right") {
    src = characterSE;
  }

  // Calculation for placing the moving character.
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;

  return (
    <img
      className="character"
      src={src}
      alt="character"
      style={{
        top: `${yAbs}%`,
        left: `${xAbs}%`,
      }}
    />
  );
}

export default Character;
