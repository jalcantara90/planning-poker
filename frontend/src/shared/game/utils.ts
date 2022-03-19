import { GameOptions } from "./types";
import { VotingSystem } from "../voting-system/type";

  export function buildOptions(votingSystem: VotingSystem): GameOptions[] {
    return votingSystem.options.map((option) => {
      return { 
        value: option,
        isSelected: false
      }
    });
  };
