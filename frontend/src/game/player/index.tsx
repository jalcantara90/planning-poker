import { FC } from "react";
import { useTheme } from "@nextui-org/react";

import { PlayerContainer, PlayerCard, PlayerCardTitle } from "../styled";
import { MdVisibility } from 'react-icons/md';

type PlayerProps = {
  selected?: number | string | null;
  playerName: string;
  isSpectator: boolean;
  revealed: boolean;
}

export const Player: FC<PlayerProps> = ({ selected, playerName, isSpectator, revealed = false }) => {
  const { isDark } = useTheme();

  return (
    <PlayerContainer>
      <PlayerCard isDark={!!isDark} isSelected={!!selected && !revealed} isSpectator={isSpectator}>
        {
          revealed && selected
        }
        {
          isSpectator && <MdVisibility />
        }
      </PlayerCard>
      <PlayerCardTitle> { playerName } </PlayerCardTitle>
    </PlayerContainer>
  );
}
