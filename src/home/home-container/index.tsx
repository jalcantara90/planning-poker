import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 76px);

  @media (max-width: 1130px) {
    flex-direction: column;
    align-items: center;
  }

`;

export const HomeTextContainer = styled(motion.div)`
  max-width: 30rem;  

  @media (max-width: 1130px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HomeTitle = styled(motion.h1)`

`;
export const HomeDescription = styled(motion.p)`

`;