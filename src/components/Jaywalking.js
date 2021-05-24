import React from "react";
import World from "./World";
import Inputs from "./Inputs";
import { useRules } from "../hooks/useRules";

function Jaywalking() {
  useRules();

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}

export default Jaywalking;
