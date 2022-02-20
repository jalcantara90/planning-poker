import styled from "styled-components";

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

export const HomeTextContainer = styled.div`
  max-width: 30rem;  

  @media (max-width: 1130px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`