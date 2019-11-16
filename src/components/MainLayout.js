import React, { useEffect, useState } from "react"
import Chart from "./Chart"
import CurrentTweet from "./CurrentTweet"
import TopWord from "./TopWord"
import stopwords from "../stopwords"

const MainLayout = () => {
  const [twitterData, setTwitterData] = useState([])
  const [topTwentyWords, setTopTwentyWords] = useState([])
  const [topWord, setTopWord] = useState({})
  const [freezeCycle, setFreezeCycle] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/tweets');
        const json = await response.json();
        // BUG: sometimes we don't get the full 100, but rather something in the 90's
        console.log(json)
        setTwitterData(json)
        localStorage.setItem("twitterData", JSON.stringify(json))
      } catch (error) {
        console.log(error)
      }
    }
    if(!localStorage.getItem("twitterData")) fetchData();
    else {
      setTwitterData(JSON.parse(localStorage.getItem("twitterData")))
    }
  }, [])

  const sort = (a, b) => {
    if(a.count < b.count) return 1
    else if(a.count > b.count) return -1
    else return 0
  }

  useEffect(() => {
    const getTopTwentyWords = () => {
      let topTwenty = [];
      let allWords = []
      let wordCounts = {}
  
      twitterData.map(tweet => {
        // remove urls and @'s
        let words = tweet.text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g, "")
        words = words.replace(/(^|)@\w+/g, "")
  
        // split tweet into words
        words = tweet.text.split(/\b/);
  
        // for each word, sanitize the word and then add it to wordCounts and allWords
        words.map(word => {
          word = word.trim()
          word = word.toLowerCase()
          if(word.length === 1) word = null
          if(word && word.match(/[^a-zA-Z0-9\d\s:]/g)) word = null
          
          if(word && stopwords.indexOf(word.toLowerCase()) < 0) {
            wordCounts["_" + word] = (wordCounts["_" + word] || 0) + 1
            if(allWords.indexOf(word) < 0) allWords.push(word)
          }
          return false;
        })
        return false;
      })
      console.log(allWords)
      console.log(wordCounts)
      for (let word of allWords) {
          topTwenty.push({ word: word, count: wordCounts["_" + word] })
      }
      topTwenty.sort(sort)
      topTwenty = topTwenty.slice(0, 20)
      setTopTwentyWords(topTwenty)
      return topTwenty;
    }
    if(twitterData.length > 0 && topTwentyWords.length === 0) console.log(getTopTwentyWords())
  }, [twitterData, topTwentyWords])

  const handleChartHover = (newTopWord) => {
    if(!topWord) setTopWord(newTopWord)
    if(topWord && newTopWord && topWord.word !== newTopWord.word) setTopWord(newTopWord)
    if(newTopWord) setFreezeCycle(true)
  }

  const handleCycleChange = (newTopWord) => {
    if(!freezeCycle) setTopWord(newTopWord)
  }

  useEffect(() => {
    const selectAll = document.querySelectorAll(`.pieces > g > path`)
    if(topWord && selectAll.length > 0) {
      const selectThis = document.querySelector(`.pieces > g:nth-child(${topWord.index + 1}) > path`)
      if(selectThis) {
        // if(freezeCycle) {
          selectAll.forEach(el => {
            el.style.fillOpacity = 0.4;
          })
        // }
        selectThis.style.fillOpacity = 1;
      }
    }
  }, [topWord, freezeCycle])

  return (
    <div className="grid">
      <div className="grid__chart">
        <div className="grid__chartFrame">
          <Chart twitterData={twitterData} topTwentyWords={topTwentyWords} handleHover={handleChartHover} handleCycleOn={handleCycleChange} />
          <TopWord topWord={topWord} />
        </div>
      </div>
      <div className="grid__tweets">
        <div className="grid__tweetsContainer">
          <CurrentTweet twitterData={twitterData} />
        </div>
      </div>
    </div>)
}

export default MainLayout