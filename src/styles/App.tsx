import { IPropsTheme } from "../interfaces/interfaces"
import styled from "styled-components";

export const AppContainer = styled.main`
  text-align: center;
`

export const AppBody = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: ${(props: IPropsTheme) => props.theme.baseFontColor};
  min-height: calc(100vh - 23rem);
  padding-bottom: 5rem;
`

export const AppHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0;
  padding-bottom: 4rem;

  @media (min-width: 80rem) {
    padding-bottom: 8rem;
  }
`

export const AppHeaderText = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 3rem 0 1rem 0;
`

export const AppHeaderSubtext = styled.h2`
  font-size: 1.4rem;
  font-weight: normal;
  margin: 0;
`