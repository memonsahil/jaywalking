import { useCallback, useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

function Inputs() {
  const characterState = atom({
    key: "characterState",
    default: { x: 4, y: 8, dir: "up" },
  });
  const [character, setCharacter] = useRecoilState(characterState);

  const keyPressHandler = useCallback(() => {
    console.log("keypress");
  });

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  return "";
}

export default Inputs;
