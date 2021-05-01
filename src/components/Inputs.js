import { useCallback, useEffect } from "react";
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
    (keyPress) => {
      keyPress.preventDefault();
      if (gameOver || !allowInput) {
        return;
      }

      if (keyPress.code() === "ArrowLeft") {
        // left
        setCharacter({
          x: character.x > 0 ? character.x - 1 : character.x,
          y: character.y,
          dir: "left",
        });
      } else if (keyPress.code() === "ArrowRight") {
        // right
        setCharacter({
          x: character.x < 8 ? character.x + 1 : character.x,
          y: character.y,
          dir: "right",
        });
      } else if (keyPress.code() === "ArrowUp") {
        // up
        setCharacter({
          x: character.x,
          y: character.y > -1 ? character.y - 1 : character.y,
          dir: "up",
        });
      } else if (keyPress.code() === "ArrowDown") {
        //down
        setCharacter({
          x: character.x,
          y: character.y < 8 ? character.y + 1 : character.y,
          dir: "down",
        });
      }
    },
    [gameOver, allowInput, setAllowInput, character, setCharacter]
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
