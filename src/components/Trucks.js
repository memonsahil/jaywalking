import React, { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useInterval } from "../hooks/useInterval";
import MovingObject from "./MovingObject";

function Trucks() {
  const trucksState = atom({
    key: "trucksState",
    default: [
      // Converting id to string for better randomisation, so that the id values do not end up repeating.
      { x: -1, y: 5, dir: "down", id: Math.random().toString(36).substr(2, 9) },
      { x: 9, y: 6, dir: "up", id: Math.random().toString(36).substr(2, 9) },
    ],
  });
  const [trucks, setTrucks] = useRecoilState(trucksState);

  const moveTrucks = useCallback(() => {
    let trucksCopy = [...trucks]; // Create a copy of the entire trucksState array of objects.
    trucksCopy = trucksCopy.map((truck) => {
      // Return a single truck state object and then its updated x value depending on its dir.
      if (truck.dir === "up") {
        return {
          ...truck,
          x: parseInt(truck.x) - 1,
        };
      } else {
        return {
          ...truck,
          x: parseInt(truck.x) + 1,
        };
      }
    });

    const newTrucks = [];
    // Check if the filtered trucksState array of objects (filtered trucksCopy) does not exist.
    if (!trucksCopy.filter((truck) => truck.x === 7 || truck.x === 1).length) {
      // Push new truck objects to the newTrucks array.
      newTrucks.push({
        id: Math.random().toString(36).substr(2, 9),
        x: 9,
        y: 6,
        dir: "up",
      });
      newTrucks.push({
        id: Math.random().toString(36).substr(2, 9),
        x: -1,
        y: 5,
        dir: "down",
      });
    }

    setTrucks(
      /*
      Filter out the truck state objects that have gone out of bounds and concatenate the 
      filtered trucksState array of objects (filtered trucksCopy) with the newTrucks array.
      */
      trucksCopy
        .filter((truck) => {
          return truck.x >= -1 && truck.x <= 9;
        })
        .concat(newTrucks)
    );
  }, [trucks, setTrucks]);

  useInterval(() => {
    moveTrucks();
  }, 350);

  return (
    <>
      {trucks.map((truck) => {
        return (
          <MovingObject x={truck.x} y={truck.y} dir={truck.dir} type="truck" />
        );
      })}
    </>
  );
}

export default Trucks;
