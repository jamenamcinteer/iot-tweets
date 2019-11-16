import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import { scaleSqrt} from "d3-scale"

const Chart = (() => {
  const [twitterData, setTwitterData] = useState([])
  const [topTwentyWords, setTopTwentyWords] = useState([])
  const [frameProps, setFrameProps] = useState({})
  const [hoveredOn, setHoveredOn] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/tweets');
        const json = await response.json();
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
  
      // TODO: move this to its own file
      const stopwords = ["with", "to", "of", "the", "there", "are", "more", "this", "on", "its", "in", "and", "for", "gt", "will", "or", "an", "be", "how", "is", "from", "https", "rt", "co", "by", "our", "via", "at", "can", "you", "your", "follow", "as", "what"]
  
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
    // getTopTwentyWords()
    if(twitterData.length > 0 && topTwentyWords.length === 0) console.log(getTopTwentyWords())
    if(twitterData.length > 0) {
      let r = -12
      let g = 207
      let b = 255
      // max r is 255; each "step" between 0 and 255 is 12.75 points for 20 steps
      // max g is 255; each "step" between 209 and 255 is 2.3 points for 20 steps
      let data = topTwentyWords.map(word => {
        r += 12
        g += 2
        return {
          word: word.word,
          count: word.count,
          color: `rgb(${r}, ${g}, ${b})`
        }
      })
      // let annotations = topTwentyWords.map(word => {
      //   return {
      //     color: "#FFFFFF",
      //     // type: AnnotationCalloutElbow,
      //     // type: "custom",
      //     word: word.word,
      //     count: word.count,
      //     note: { title: word.word, wrap: 180 }
      //   }
      // })
      let newFrameProps = {
        data: data,
        size: [400, 400],
        margin: 50,
        type: { type: "bar", innerRadius: 200 },
        projection: "radial",
        dynamicColumnWidth: "count",
        oAccessor: "word",
        rAccessor: "count",
        rScaleType: scaleSqrt(),
        // axes: true,
        style: d=> ({ fill: d.color }),
        oPadding: 10,
        pieceHoverAnnotation: true,
        tooltipContent: d => {
          return (
          <div></div>
        )},
        customHoverBehavior: d => {
          setHoveredOn(d)
        }
      }
      setFrameProps(newFrameProps)
    }
  }, [twitterData, topTwentyWords])

  useEffect(() => {
    if(hoveredOn) {
      console.log(hoveredOn)
    }
    
  }, [hoveredOn])
  

  return (
  <div>
    <OrdinalFrame {...frameProps} />
  </div>)
})

export default Chart;