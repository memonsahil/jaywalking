import { WATER_TILES_Y_INDEXES } from "../constants";

const isTruckCollision = (character, trucks) => {
  return trucks.some(
    (truck) => truck.x === character.x && truck.y === character.y
  );
};

const isRidingBoat = (character, boats) => {
  return boats.some((boat) => {
    return boat.y === character.y && Math.abs(boat.x - character.x) <= 1;
  });
};

const getRiddenBoat = (character, boats) => {
  return boats.find((boat) => {
    return boat.y === character.y && Math.abs(boat.x - character.x) <= 1;
  });
};

const objectsIdentical = (o1, o2) => {
  return JSON.stringify(o1) === JSON.stringify(o2);
};

const isDrowning = (character, boats) => {
  const boatUnderCharacter = boats.some(
    (boat) => boat.y === character.y && Math.abs(boat.x - character.x) <= 1
  );
  if (WATER_TILES_Y_INDEXES.includes(character.y) && !boatUnderCharacter) {
    return true;
  } else {
    return false;
  }
};

const hasReachedGoal = (character) => {
  return character.y === -1;
};

export {
  isTruckCollision,
  isDrowning,
  getRiddenBoat,
  isRidingBoat,
  hasReachedGoal,
  objectsIdentical,
};
