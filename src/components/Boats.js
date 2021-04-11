import React, { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useInterval } from "../hooks/useInterval";
import MovingObject from "./MovingObject";

function Boats() {
  const boatsState = atom({
    key: "boatsState",
    default: [
      // Converting id to string for better randomisation, so that the id values do not end up repeating.
      { x: -1, y: 2, dir: "down", id: Math.random().toString(36).substr(2, 9) },
      { x: 9, y: 1, dir: "up", id: Math.random().toString(36).substr(2, 9) },
    ],
  });
  const [boats, setBoats] = useRecoilState(boatsState);

  const moveBoats = useCallback(() => {
    let boatsCopy = [...boats];
    boatsCopy = boatsCopy.map((boat) => {
      // Return a single boat object from boatsCopy and update its x value for moving.
      if (boat.dir === "up") {
        return {
          ...boat,
          x: parseInt(boat.x) - 1,
        };
      } else {
        return {
          ...boat,
          x: parseInt(boat.x) + 1,
        };
      }
    });

    const newBoats = [];
    // Filter boatsCopy and check if a boat is present at
    // the initial tile on either side, i.e. at x = 1 || 7.
    if (!boatsCopy.filter((boat) => boat.x === 1 || boat.x === 7).length) {
      newBoats.push({
        id: Math.random().toString(36).substr(2, 9),
        x: 9,
        y: 1,
        dir: "up",
      });
      newBoats.push({
        id: Math.random().toString(36).substr(2, 9),
        x: -1,
        y: 2,
        dir: "down",
      });
    }

    setBoats(
      // Filter out the boat objects that have gone out of bounds
      // and concatenate the filtered boatsCopy with newBoats.
      boatsCopy
        .filter((boat) => {
          return boat.x >= -1 && boat.x <= 9;
        })
        .concat(newBoats)
    );
  }, [boats, setBoats]);

  useInterval(() => {
    moveBoats();
  }, 350);

  return (
    <>
      {boats.map((boat) => {
        return (
          <MovingObject
            key={boat.id}
            x={boat.x}
            y={boat.y}
            dir={boat.dir}
            type="boat"
          />
        );
      })}
    </>
  );
}

export default Boats;
