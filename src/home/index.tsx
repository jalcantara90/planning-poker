import { Button, Text, Spacer, useTheme } from "@nextui-org/react";
import { HomeContainer, HomeTextContainer } from "./home-container";
import { HomeImage } from './home-image';

import homeIliustration from '../../assets/home-image.svg';

export const Home = () => {
  const { isDark } = useTheme();

  return (
    <main>
      <HomeContainer>
        <HomeTextContainer>
          <Text h1 css={{
            textAlign: 'center',
            '@md': {
              textAlign: 'left',
            }
          }}>
            Scrum Poker for agile development teams
          </Text>
          <Spacer y={2}/>
          <Text b>Simple and engaging tool to make estimates.</Text>
          <Spacer y={2}/>
          <Button size="xl" color="gradient">
            Start new game
          </Button>
        </HomeTextContainer>
        <HomeImage src={homeIliustration} alt="" />
      </HomeContainer>
      <svg  
        style={{
          color: isDark ? '#07003e' : '#f9f9f9',
          position: 'absolute',
          bottom: 0
        }}
        viewBox="0 0 1440 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M448 0C228.764 0 54.5 30.7284 0 44V128H1440V1.88947e-05C1412 7.64564 1257.54 43 993 43C728.461 43 667.236 0 448 0Z" fill="currentColor"></path></svg>
    </main>
  );
}