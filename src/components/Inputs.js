import { useCallback, useEffect, useRef } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

function Inputs() {
  const characterState = atom({
    key: "characterState",
    default: { x: 4, y: 8, dir: "up" },
  });
  const [character, setCharacter] = useRecoilState(characterState);

  const allowInputState = atom({
    key: "allowInputState",
    default: true,
  });
  const [allowInput, setAllowInput] = useRecoilState(allowInputState);

  const gameOver = useRecoilValue(atom({ key: "gameOverState" }));

  let timer = useRef(false);
  useEffect(() => {
    return clearTimeout(timer.current);
  }, [timer]);

  const keyPressHandler = useCallback(
    (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      if (gameOver) {
        return;
      }

      if (!allowInput) {
        return;
      }

      // Delay between each keyPress
      setAllowInput(false);
      timer.current = setTimeout(() => {
        setAllowInput(true);
      }, 350);

      if (e.keyCode === 37) {
        // left
        setCharacter({
          x: character.x > 0 ? character.x - 1 : 0,
          y: character.y,
          dir: "left",
        });
      } else if (e.keyCode === 39) {
        // right
        setCharacter({
          x: character.x < 8 ? character.x + 1 : 8,
          y: character.y,
          dir: "right",
        });
      } else if (e.keyCode === 38) {
        // up
        setCharacter({
          x: character.x,
          y: character.y > -1 ? character.y - 1 : 0,
          dir: "up",
        });
      } else if (e.keyCode === 40) {
        // down
        setCharacter({
          x: character.x,
          y: character.y < 8 ? character.y + 1 : 8,
          dir: "down",
        });
      }
    },
    [character, setCharacter, gameOver, allowInput, setAllowInput]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  return "";
}

export default Inputs;
