import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { GameOptions } from "../../shared/game/types";
import { VotingCard, VotingCardContainer } from "../styled";
import { fadeInDown, fadeInStaggerContainer } from "../../shared/animations/fade-in";

type VotingCardsProps = {
  options?: GameOptions[];
  onSelectCard: (option: number | string) => void;
  isDisabled?: boolean;
}

export const VotingCards: FC<VotingCardsProps> = ({ options, onSelectCard, isDisabled = false }) => {
  return (
    <AnimatePresence>
      <VotingCardContainer {...fadeInStaggerContainer} exit={{ y: -20 }}>
        {
          options?.map((option: GameOptions, index) => (
            <motion.div
              key={index}
              variants={fadeInDown.variants}>
              <VotingCard 
                bordered 
                clickable
                disabled={isDisabled}
                color={option.isSelected ? 'gradient' : 'default'}
                selected={option.isSelected}
                onClick={() => !isDisabled ? onSelectCard(option.value) : {} }> 
                { option.value }
              </VotingCard>
            </motion.div>
          ))
        }
      </VotingCardContainer>
    </AnimatePresence>
  );
}
