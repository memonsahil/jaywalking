const isTruckCollision = (character, trucks) => {
  return trucks.some((truck) => {
    return truck.x === character.x && truck.y === character.y;
  });
};

const isDrowning = (character, boats) => {
  const waterTileYIndexes = [1, 2];
  
};

const isRidingBoat = (character, boats) => {
  return boats.some((boat) => {
    return boat.x === character.x && boat.y === character.y;
  });
};

const getRiddenBoat = (character, boats) => {
  return boats.find((boat) => {
    return boat.x === character.x && boat.y === character.y;
  });
};

const hasReachedGoal = (character) => {
  character.y < 0;
};

export {
  isTruckCollision,
  isDrowning,
  isRidingBoat,
  getRiddenBoat,
  hasReachedGoal,
};
