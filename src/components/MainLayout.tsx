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

  const sort = (a: ITopWord, b: ITopWord) => {
    if(a.count < b.count) return 1
    else if(a.count > b.count) return -1
    else return 0
  }

  useEffect(() => {
    const getTopTwentyWords = () => {
      let topTwenty = [];
      let allWords: Array<string> = []
      let wordCounts: any = {}
  
      twitterData.forEach((tweet: ITweets) => {
        // remove urls
        let words: string | Array<string> = tweet.text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g, "")
        // remove @'s
        words = words.replace(/(^|)@\w+/g, "")
        // split tweet into words
        words = tweet.text.split(/\b/);
  
        // for each word, sanitize the word and then add it to wordCounts and allWords
        words.map((word: string | null) => {
          word = word ? word.trim() : word
          word = word ? word.toLowerCase() : word
          if(word && word.length === 1) word = null
          if(word && word.match(/[^a-zA-Z0-9\d\s:]/g)) word = null
          
          if(word && stopwords.indexOf(word.toLowerCase()) < 0) {
            wordCounts["_" + word] = (wordCounts["_" + word] || 0) + 1
            if(allWords.indexOf(word) < 0) allWords.push(word)
          }
          return false;
        })
        return false;
      })
      for (let word of allWords) {
          let newTopWord: ITopWord = { word: word, count: wordCounts["_" + word] }
          topTwenty.push(newTopWord)
      }
      topTwenty.sort(sort)
      topTwenty = topTwenty.slice(0, 20)
      setTopTwentyWords(topTwenty)
      return topTwenty;
    }
    if(twitterData.length > 0 && topTwentyWords.length === 0) getTopTwentyWords()
  }, [twitterData, topTwentyWords])

  const handleChartHover = (newTopWord: ITopWord) => {
    if(!topWord) setTopWord(newTopWord)
    if(topWord && newTopWord && topWord.word !== newTopWord.word) setTopWord(newTopWord)
    if(newTopWord) setFreezeCycle(true)
  }

  const handleCycleChange = (newTopWord: ITopWord) => {
    if(!freezeCycle) setTopWord(newTopWord)
  }

  useEffect(() => {
    const selectAll: NodeListOf<Element> = document.querySelectorAll(`.pieces > g > path`)
    if(topWord && selectAll.length > 0) {
      const selectThis: any = document.querySelector(`.pieces > g:nth-child(${topWord.index + 1}) > path`)
      if(selectThis) {
        // if(freezeCycle) {
          selectAll.forEach((el: any) => {
            el.style.fillOpacity = 0.4;
          })
        // }
        selectThis.style.fillOpacity = 1;
      }
    }
  }, [topWord, freezeCycle])

  return (
    <Grid>
      <GridChart>
        <GridChartFrame>
          <Chart twitterData={twitterData} topTwentyWords={topTwentyWords} handleHover={handleChartHover} handleCycleOn={handleCycleChange} />
          <TopWord topWord={topWord} />
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