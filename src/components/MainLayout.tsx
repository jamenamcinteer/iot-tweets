import React, { useEffect, useState } from "react"
import styled from "styled-components";
import Chart from "./Chart"
import CurrentTweet from "./CurrentTweet"
import TopWord from "./TopWord"
import stopwords from "../stopwords"
import { ITopTwentyWords, ITweets, ITopWord } from "../interfaces/interfaces"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem 9rem;
  width: 100%;

  @media (min-width: 80rem) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 90rem) {
    grid-template-columns: 1fr 400px 25rem 1fr;
  }
`

const GridChart = styled.div`
  @media (min-width: 90rem) {
    grid-column: 2;
  }
`

const GridChartFrame = styled.div`
  position: relative;
  margin: 0 auto;

  @media (min-width: 28rem) {
    width: 400px;
  }
  @media (min-width: 80rem) {
    float: right;
    margin: 0;
  }
  @media (min-width: 90rem) {
    float: none;
    margin: 0 auto;
  }
`

const GridTweets = styled.div`
  @media (min-width: 90rem) {
    grid-column: 3;
  }
`

const GridTweetsContainer = styled.div`
  max-width: 25rem;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;

  @media (min-width: 80rem) {
    margin: 0;
  }
  @media (min-width: 90rem) {
    margin: 0 auto;
  }
`

const MainLayout = () => {
  const [twitterData, setTwitterData] = useState<Array<ITweets> | []>([])
  const [topTwentyWords, setTopTwentyWords] = useState<Array<ITopTwentyWords>>([])
  const [topWord, setTopWord] = useState<ITopWord | undefined>(undefined)
  const [freezeCycle, setFreezeCycle] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response: Response = await fetch('/tweets');
        const json: Array<ITweets> = await response.json();
        // BUG: sometimes we don't get the full 100, but rather something in the 90's
        setTwitterData(json)
        // localStorage.setItem("twitterData", JSON.stringify(json))
      } catch (error) {
        console.error(error) // TODO: handle this case gracefully
      }
    }
    fetchData();
    // if(!localStorage.getItem("twitterData")) fetchData();
    // else {
    //   setTwitterData(JSON.parse(localStorage.getItem("twitterData") || '{}'))
    // }
  }, [])

  const sort = (a: ITopTwentyWords, b: ITopTwentyWords) => {
    if(a.count < b.count) return 1
    else if(a.count > b.count) return -1
    else return 0
  }

  useEffect(() => {
    const getTopTwentyWords = () => {
      let topTwenty = [];
      let allWords = []
      let wordCounts = {}
  
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
          topTwenty.push({ word: word, count: wordCounts["_" + word] })
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