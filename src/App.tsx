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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyles />
        <AppBody>
          <MainLayout />
        </AppBody>
      </AppContainer>
    </ThemeProvider>
    
  );
}

export default App;
