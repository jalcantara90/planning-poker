import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Card, Button } from '@nextui-org/react';

export const TableGrid = styled(motion.section)`
  grid-gap: 0.8rem;
  display: inline-grid;
  grid-template-rows: 11rem 1fr 13.4rem;
  grid-template-columns: 10.4rem 1fr 10.4rem;
  margin: 0 auto;
  min-height: 200px;
  grid-template-areas:
    "left top right"
    "left table right"
    "left bottom right";
`;

export const GameTop = styled(motion.div)`
  align-items: stretch;
  grid-area: top;
  display: flex;
  justify-content: center;
`;

export const GameLeft = styled(motion.div)`
  grid-area: left;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const GameRight = styled(motion.div)`
  grid-area: right;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const GameBottom = styled(motion.div)`
  align-items: stretch;
  grid-area: bottom;
  display: flex;
  justify-content: center;
`;

export const Table = styled(motion.div)`
  align-items: center;
  display: flex;
  justify-content: center;
  grid-area: table;
  min-height: 15.1rem;
  min-width: 33.8rem;
  padding: 1.5rem;
`;

export const TableButton = styled(Button)`
  max-width: 13rem;
  padding: 2rem 3rem;
  align-self: center;
`;

export const CountDown = styled(motion.p)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
`;

export const TableCard = styled(Card)`
  height: 100%;
  display: flex;
  justify-content: center;
`

export const GameContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  padding-bottom: 0;
  width: 100%;
`;

export const PlayerContainer = styled(motion.div)`
  max-width: 10.4rem;
  width: 10.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Player = styled(motion.div)`
  font-size: 1.8rem;
  padding-top: 0.8rem;
  width: auto;
`;

export const PlayerCard = styled(motion.div)<{ isDark?: boolean, isSelected?: boolean, isSpectator?: boolean }>`
  border-radius: 0.8rem;
  height: 7rem;
  width: 4rem;
  background-color: ${props => props?.isDark ? !!props?.isSelected ? '#0070f3' : '#111111' : !!props?.isSelected ? '#026ff3' : '#ebf4ff'};
  visibility: ${props => props?.isSpectator ? 'hidden' : 'inherit' };
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const VotingCardContainer = styled(motion.section)`
  display: flex;
  padding: 5rem;
  justify-content: center;
  gap: 1rem;
`;

export const VotingCard = styled(Card)<{ selected?: boolean, disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;
  width: 4.2rem;
  transform: ${props => props?.selected ? 'translateY(-2rem)' : 'translateY(0)'};
  font-size: 2rem;
  font-weight: bold;
  opacity: ${props => props.disabled ? .7 : 1};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ResumeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

export const Resume = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
`;

export const ResumeCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;
  width: 4rem;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ResumeBar = styled(motion.div)<{ isDark?: boolean }>`
  height: 85px;
  background: ${props => props.isDark ? '#292828' : '#00000017'};
  border-radius: 25px;
  transform: rotate(180deg);
  margin-bottom: 1rem;
`;

export const Progress = styled(motion.div)<{ percentage: number }>`
  height: ${props => props.percentage + '%'};
  display: block;
  width: 8px;
  border-radius: 8px;
  background-color: #0070f3;
  box-shadow: inset 0 2px 9px rgb(255 255 255 / 30%), inset 0 -2px 6px rgb(0 0 0 / 40%);
  position: relative;
  overflow: hidden;
`;