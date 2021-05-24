import { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  isTruckCollision,
  isDrowning,
  getRiddenBoat,
  isRidingBoat,
  hasReachedGoal,
  objectsIdentical,
} from "../components/Rules";

export function useRules() {
  // Character
  const characterState = atom({ key: "characterState", default: {} });
  const [character, setCharacter] = useRecoilState(characterState);

  // Trucks
  const trucks = useRecoilValue(atom({ key: "trucksState" }));

  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));

  // Gameover
  const gameOverState = atom({ key: "gameOverState", default: false });
  const [gameOver, setGameOver] = useRecoilState(atom(gameOverState));

  // Check for truck collision.
  useEffect(() => {
    if (trucks && isTruckCollision(character, trucks)) {
      setGameOver(true);
      setCharacter({
        ...character,
        dead: true,
      });
    }
  }, [character, trucks, setCharacter, setGameOver]);

  // Check for boat interaction.
  useEffect(() => {
    if (boats && isRidingBoat(character, boats)) {
      const boat = getRiddenBoat(character, boats);
      if (
        !objectsIdentical(character, { ...character, x: boat.x, y: boat.y })
      ) {
        setCharacter({ ...character, x: boat.x, y: boat.y });
      }
    } else if (boats && isDrowning(character, boats)) {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!character.dead) {
        setCharacter({ ...character, dead: true });
      }
    }
  }, [boats, character, setCharacter, gameOver, setGameOver]);

  // Check if reached goal.
  useEffect(() => {
    if (hasReachedGoal(character)) {
      setCharacter({ ...character, x: 4, y: 8 });
    }
  }, [character, setCharacter]);
}
