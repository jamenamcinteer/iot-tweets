import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import MainLayout from "./components/MainLayout";
import theme from "./theme"
import { IPropsTheme, ITweets } from "./interfaces/interfaces"

const GlobalStyles = createGlobalStyle`
  body, html {
    box-sizing: border-box;
  }
  body {
    background: url("/images/background-desktop.jpg") no-repeat center center fixed; /* TODO: need different sizes for mobile and tablet to help with performance / data usage */
    background-color: ${(props: IPropsTheme) => props.theme.pageBackgroundColor};
    background-size: cover;
    color: ${(props: IPropsTheme) => props.theme.baseFontColor};
    margin: 0;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif; */
    font-family: ${(props: IPropsTheme) => props.theme.baseFontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const AppContainer = styled.main`
  text-align: center;
`

const AppBody = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: ${(props: IPropsTheme) => props.theme.baseFontColor};
  min-height: calc(100vh - 23rem);
  padding-bottom: 5rem;
`

const AppHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0;
  padding-bottom: 4rem;

  @media (min-width: 80rem) {
    padding-bottom: 8rem;
  }
`
const AppHeaderText = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 3rem 0 1rem 0;
`
const AppHeaderSubtext = styled.h2`
  font-size: 1.4rem;
  font-weight: normal;
  margin: 0;
`

function App() {
  const [twitterData, setTwitterData] = useState<Array<ITweets> | []>([])

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response: Response = await fetch('/tweets');
        const json: Array<ITweets> = await response.json();
        // BUG: sometimes we don't get the full 100, but rather something in the 90's
        setTwitterData(json)
      } catch (error) {
        console.error(error) // TODO: handle this case gracefully
      }
    }
    fetchData();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyles />
        <AppHeader>
          <AppHeaderText>#IoT</AppHeaderText>
          <AppHeaderSubtext>Top 20 Words in 100 Recent Tweets</AppHeaderSubtext>
        </AppHeader>
        <AppBody>
          <MainLayout twitterData={twitterData} />
        </AppBody>
      </AppContainer>
    </ThemeProvider>
    
  );
}

export default App;
