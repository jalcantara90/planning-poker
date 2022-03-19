import { useTheme } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'

import { 
  TableGrid,
  GameContainer,
  Table,
  GameTop,
  GameBottom,
  GameLeft,
  GameRight,
  TableCard,
  PlayerContainer,
  PlayerCard,
  Player,
  VotingCardContainer,
  VotingCard,
  CountDown,
  TableButton,
  ResumeBar,
  ResumeCard,
  ResumeContainer,
  Resume,
  Progress
} from './table';
import { useToggle } from '../shared/hooks';
import { GameOptions } from '../shared/game/types';
import { fadeInDown, fadeInStaggerContainer } from '../shared/animations/fade-in';
import { useGame } from '../shared/game/hooks';

const COUNT_DOWN_TIME = 2; // in seconds

export const Game: FC = () => {
  const { gameId } = useParams();
  const { game, isLoading } = useGame(gameId as string);
  const [options, setOptions] = useState<GameOptions[]>();
  const [users, setUsers] = useState<UserPlaces>({
    bottom: [],
    top: [],
    right: [],
    left: []
  });
  const [reveal, toggleReveal] = useToggle(false);
  const [countDown, setCountDown] = useState<number | null>(null);

  const selectOption = (value: number | string) => {
    const lastValue = options?.find(option => option.isSelected);
    const updatedOptions = options?.map(option => ({ 
      ...option,
      isSelected: option.value === value && (value !== lastValue?.value || !lastValue)
    }));
  
    setOptions(updatedOptions);
  }

  const setUsersPlace = (userList: User[]): UserPlaces => {
    return userList
      .sort((a, b) => a.me ? -1 : 1)
      .reduce<UserPlaces>((acc, current, index) => {
        acc[indexPlaces[index]].push(current);
        return acc;
      }, {
        bottom: [],
        top: [],
        right: [],
        left: []
      });
  }

  const revealCards = () => {
    setCountDown(COUNT_DOWN_TIME);
  }

  const resetVoting = () => {
    toggleReveal();
    setCountDown(null);
    setUsers(userPlaces => ({
      bottom: userPlaces.bottom.map(user => ({ ...user, selectedCard: null })),
      top: userPlaces.top.map(user => ({ ...user, selectedCard: null })),
      right: userPlaces.right.map(user => ({ ...user, selectedCard: null })),
      left: userPlaces.left.map(user => ({ ...user, selectedCard: null }))
    }));
    setOptions(ops => ops?.map(option => ({ ...option, isSelected: false })));
  }

  useEffect(() => {
    setUsers(setUsersPlace(userList));
  }, [setOptions]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setOptions(game?.options);
  }, [game]);

  useEffect(() => {
    if (!options?.length) {
      return;
    }

    const selectedOption = options?.find(option => option.isSelected);

    setUsers(prevState => ({
      ...prevState,
      bottom: prevState.bottom.map((user) => {
        if (user.me) {
          user.selectedCard = selectedOption?.value;
        }
        return user;
      })
    }));    
  }, [options]);

  useEffect(() => {
    countDown && countDown > 0 && setTimeout(
      () => setCountDown(countDown - 1),
      1000
    );

    if (countDown === 0) {
      toggleReveal();
    }
  }, [countDown]);

  return (
    <main>
      <GameContainer>
        <TableGrid>
          <GameTop>
            {
              users?.top.map(user => <PlayerModule 
                  key={user.id}
                  revealed={reveal}
                  selected={user.selectedCard}
                  playerName={user.name}
                  isSpectator={user.isSpectator}
                />
              )
            }
          </GameTop>
          <GameLeft>
          {
              users?.left.map(user => <PlayerModule 
                  key={user.id}
                  revealed={reveal}
                  selected={user.selectedCard}
                  playerName={user.name}
                  isSpectator={user.isSpectator}
                />
              )
            }
          </GameLeft>
          <Table>
            <TableCard>
              {
                reveal && !countDown && <TableButton auto color="secondary" ghost size="lg" onClick={resetVoting}>Reset</TableButton>
              }
              {
                !reveal && !countDown && <TableButton auto size="lg" onClick={revealCards}>Reveal cards</TableButton>
              }
              {
                !!countDown && (
                  <CountDown>{countDown}</CountDown> 
                )
              }
            </TableCard>
          </Table>
          <GameRight>
            {
              users?.right.map(user => <PlayerModule 
                  key={user.id}
                  revealed={reveal}
                  selected={user.selectedCard}
                  playerName={user.name}
                  isSpectator={user.isSpectator}
                />
              )
            }
          </GameRight>
          <GameBottom>
            {
              users?.bottom.map(user => <PlayerModule 
                  key={user.id}
                  revealed={reveal}
                  selected={user.selectedCard}
                  playerName={user.name}
                  isSpectator={user.isSpectator}
                />
              )
            }
          </GameBottom>
        </TableGrid>
      </GameContainer>
      {
        options?.length && !reveal ?
          <VotingCards options={options} onSelectCard={selectOption} isDisabled={!!countDown}/>: 
          <VotingResume userPlaces={users}/> 
      }
    </main>
  );
};

type PlayerModuleProps = {
  selected?: number | string | null;
  playerName: string;
  isSpectator: boolean;
  revealed: boolean;
}

export const PlayerModule: FC<PlayerModuleProps> = ({ selected, playerName, isSpectator, revealed = false }) => {
  const { isDark } = useTheme();

  return (
    <PlayerContainer>
      <PlayerCard isDark={!!isDark} isSelected={!!selected && !revealed} isSpectator={isSpectator}>
        {
          revealed && selected
        }
      </PlayerCard>
      <Player> { playerName } </Player>
    </PlayerContainer>
  );
}

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

type VotingResumeProps = {
  userPlaces: UserPlaces;
};

type Resume = {
  [key: string]: number;
}

export const VotingResume: FC<VotingResumeProps> = ({ userPlaces }) => {
  const [resume, setResume] = useState<Resume>({});
  const [total, setTotal] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const values = Object.values(userPlaces)
      .flat()
      .map(({ selectedCard }) => selectedCard)
      .filter(c => !!c);

    const r = values.reduce((acc, current) => {
      if (!current) {
        return acc;
      }

      acc[current] =  acc[current] ? acc[current] + 1 : 1;

      return acc;
    }, {} as Resume);

    setTotal(values.length);
    setResume(r);
  }, [userPlaces]);

  return (
    <ResumeContainer {...fadeInStaggerContainer}>
      {
        Object.entries(resume).map(([value, qty]) => (
          <Resume key={value}>
            <ResumeBar isDark={isDark}>
              <Progress transition={{ duration: 400 }} animate={{ height: (100 * qty) / total + '%' }} percentage={(100 * qty) / total}/>
            </ResumeBar>
            <ResumeCard>
              { value }
            </ResumeCard>
            <span> Vote { qty } </span>
          </Resume>
        ))
      }
    </ResumeContainer>
  );
}

type User = {
  id: string;
  name: string;
  me: boolean;
  selectedCard?: number | string | null;
  isSpectator: boolean;
}

const userList: User[] = [
  { id: '6', name: 'Eric', me: false, selectedCard: 'S', isSpectator: false },
  { id: '2', name: 'Mourad', me: false, selectedCard: 'S', isSpectator: false },
  { id: '3', name: 'Marçal', me: false, selectedCard: 'M', isSpectator: false },
  { id: '4', name: 'Carmen', me: false, selectedCard: 'L', isSpectator: false },
  { id: '5', name: 'Joan', me: false, selectedCard: 'XL', isSpectator: false },
  { id: '1', name: 'Jonathan', me: true, isSpectator: false },
  { id: '7', name: 'Carlos', me: false, isSpectator: true },
  { id: '8', name: 'Borja', me: false, isSpectator: false },
  { id: '9', name: 'Manu', me: false, isSpectator: true},
];

type UserPlaces = {
  bottom: User[];
  top: User[];
  right: User[];
  left: User[];
}

const indexPlaces: { [key: number]: 'bottom' | 'top' | 'left' | 'right' } = {
  0: 'bottom',
  1: 'top',
  2: 'bottom',
  3: 'top',
  4: 'bottom',
  5: 'top',
  6: 'right',
  7: 'left',
  8: 'right',
  9: 'left',
  10: 'bottom',
  11: 'top',
};
