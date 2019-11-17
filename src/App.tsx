import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import MainLayout from "./components/MainLayout";
import theme from "./theme"
import { IPropsTheme } from "./interfaces/interfaces"

const GlobalStyles = createGlobalStyle`
  body, html {
    box-sizing: border-box;
  }
  body {
    background: url("/images/background-desktop.jpg") no-repeat center center fixed; 
    background-color: ${(props: IPropsTheme) => props.theme.pageBackgroundColor};
    background-size: cover;
    color: ${(props: IPropsTheme) => props.theme.baseFontColor};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`

const AppContainer = styled.div`
  text-align: center;
`

const AppBody = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${(props: IPropsTheme) => props.theme.baseFontColor};
`

const AppHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0;
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
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyles />
        <AppHeader>
          <AppHeaderText>#IoT</AppHeaderText>
          <AppHeaderSubtext>Top 20 words in 100 recent tweets</AppHeaderSubtext>
        </AppHeader>
        <AppBody>
          <MainLayout />
        </AppBody>
      </AppContainer>
    </ThemeProvider>
    
  );
}

export default App;
