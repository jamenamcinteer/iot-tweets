import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "styled-components"
import MainLayout from "./components/MainLayout"
import theme from "./theme"
import { ITweets } from "./interfaces/interfaces"
import { GlobalStyles } from "./styles/GlobalStyles"
import { AppContainer, AppBody, AppHeader, AppHeaderText, AppHeaderSubtext } from "./styles/App"


function App() {
  const [twitterData, setTwitterData] = useState<Array<ITweets> | []>([])
  const [apiError, setApiError] = useState<boolean>(false)

  // Fetch the twitter data from our API
  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response: Response = await fetch('/tweets')
        if(response.status !== 200) {
          setApiError(true)
        }
        else {
          const json: Array<ITweets> = await response.json()
          setTwitterData(json)
        }
      } catch (error) {
        setApiError(true)
      }
    }
    fetchData()
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
          {
            !apiError
            ? <MainLayout twitterData={twitterData} />
            : <div>Sorry, there was an issue with fetching the Twitter data. Please try again later.</div>
          }
        </AppBody>
      </AppContainer>
    </ThemeProvider>
    
  )
}

export default App
