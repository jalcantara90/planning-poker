import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { 
  TableGrid,
  GameContainer,
  Table,
  GameTop,
  GameBottom,
  GameLeft,
  GameRight,
  TableCard,
  CountDown,
  TableButton
} from './styled';
import { Player } from './player';
import { useGamePlay } from './hooks';
import { VotingCards } from './voting-cards';
import { VotingResume } from './voting-resume';

export const Game: FC = () => {
  const { gameId } = useParams();
  const {
    users,
    reveal,
    options,
    countDown,
    revealCards,
    resetVoting,
    selectOption
  } = useGamePlay(gameId as string);

  return (
    <main>
      <GameContainer>
        <TableGrid>
          <GameTop>
            {
              users?.top.map(user => <Player 
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
              users?.left.map(user => <Player 
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
              users?.right.map(user => <Player 
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
              users?.bottom.map(user => <Player 
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



