import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import MainLayout from "./components/MainLayout";
import theme from "./theme"
import { ITweets } from "./interfaces/interfaces"
import { GlobalStyles } from "./styles/GlobalStyles"
import { AppContainer, AppBody, AppHeader, AppHeaderText, AppHeaderSubtext } from "./styles/App"


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
