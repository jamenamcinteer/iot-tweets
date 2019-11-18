import React, { useEffect, useState } from "react"
import Chart from "./Chart"
import CurrentTweet from "./CurrentTweet"
import TopWord from "./TopWord"
import stopwords from "../stopwords"
import { ITweets, ITopWord, IMainLayoutProps } from "../interfaces/interfaces"
import { Grid, GridChart, GridChartFrame, GridTweets, GridTweetsContainer } from "../styles/MainLayout"

const MainLayout = ({ twitterData }: IMainLayoutProps) => {
  const [topTwentyWords, setTopTwentyWords] = useState<Array<ITopWord>>([])
  const [topWord, setTopWord] = useState<ITopWord | undefined>(undefined)
  const [freezeCycle, setFreezeCycle] = useState<boolean>(false)

  // Determine the top twenty words and set them
  useEffect(() => {
    const getTopTwentyWords = () => {
      let topTwenty: Array<ITopWord> = []
      let allWords: Array<string> = []
      let wordCounts: any = {}
  
      twitterData.forEach((tweet: ITweets) => {
        // remove urls from tweet
        let words: string | Array<string> = tweet.text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g, "")
        // remove @USERNAME's from tweet
        words = words.replace(/(^|)@\w+/g, "")
        // split tweet into words
        words = tweet.text.split(/\b/)
  
        // for each word, sanitize the word and then add it to wordCounts and allWords
        words.forEach((word: string | null) => {
          // remove whitespace
          word = word ? word.trim() : word
          // make it lowercase
          word = word ? word.toLowerCase() : word
          // throw out any one character words
          if(word && word.length === 1) word = null
          // throw out any words with non-alphanumeric characters
          if(word && word.match(/[^a-zA-Z0-9\d\s:]/g)) word = null
          
          // if the word is still valid and it isn't a stopword, add it to the allWords array
          // start the initial value at 0 if it doesn't exist or add 1 if it does
          if(word && stopwords.indexOf(word.toLowerCase()) < 0) {
            wordCounts["_" + word] = (wordCounts["_" + word] || 0) + 1
            if(allWords.indexOf(word) < 0) allWords.push(word)
          }
        })
      })

      // our allWords array is now populated, now we add each word with its count to the topTwenty array
      for (let word of allWords) {
          let newTopWord: ITopWord = { word: word, count: wordCounts["_" + word] }
          topTwenty.push(newTopWord)
      }
      // sort topTwenty by ascending count
      topTwenty.sort(sort)
      // only keep the first 20 items
      topTwenty = topTwenty.slice(0, 20)
      setTopTwentyWords(topTwenty)
      return topTwenty
    }

    // only run the above method if we have all the twitter data and don't yet have our top twenty words
    if(twitterData.length > 0 && topTwentyWords.length === 0) getTopTwentyWords()
  }, [twitterData, topTwentyWords])

  // when a chart piece is hovered, set the current top word if there isn't a top word set yet or if there is a top word currently and the new top word is different from teh current top word
  // if we have a new top word, then also freeze the timed cycle
  const handleChartHover = (newTopWord: ITopWord | undefined) => {
    if(!topWord) setTopWord(newTopWord)
    if(topWord && newTopWord && topWord.word !== newTopWord.word) setTopWord(newTopWord)
    if(newTopWord) setFreezeCycle(true)
  }

  // only set the top word based on a change in the timed cycle if the cycle has not been frozen
  const handleCycleChange = (newTopWord: ITopWord) => {
    if(!freezeCycle) setTopWord(newTopWord)
  }

  // Change the opacity of the highlighted top word
  // When the top word changes, either by a hover or a cycle change, we change the opacity of all the chart "bars" to 0.4 and then change the opacity of the highlighted chart "bar" to 1
  useEffect(() => {
    const selectAll: NodeListOf<Element> = document.querySelectorAll(`.pieces > g > path`)
    if(topWord && typeof topWord.index !== 'undefined' && selectAll.length > 0) {
      const selectThis: any = document.querySelector(`.pieces > g:nth-child(${topWord.index + 1}) > path`)
      if(selectThis) {
        // if(freezeCycle) {
          selectAll.forEach((el: any) => {
            el.style.fillOpacity = 0.4
          })
        // }
        selectThis.style.fillOpacity = 1
      }
    }
  }, [topWord, freezeCycle])

  // Sort top words by count
  const sort = (a: ITopWord, b: ITopWord) => {
    if(a.count < b.count) return 1
    else if(a.count > b.count) return -1
    else return 0
  }

  return (
    <Grid>
      <GridChart>
        <GridChartFrame>
          <Chart twitterData={twitterData} topTwentyWords={topTwentyWords} handleHover={handleChartHover} handleCycleOn={handleCycleChange} />
          {topWord && <TopWord topWord={topWord} />}
        </GridChartFrame>
      </GridChart>
      <GridTweets>
        <GridTweetsContainer>
          <CurrentTweet twitterData={twitterData} />
        </GridTweetsContainer>
      </GridTweets>
    </Grid>)
}

export default MainLayout