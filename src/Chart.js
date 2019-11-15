import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import AnnotationCalloutElbow from "react-annotation/lib/Types/AnnotationCalloutElbow"

const Chart = (() => {
  const [twitterData, setTwitterData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/tweets');
        const json = await response.json();
        console.log(json)
        setTwitterData(json)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

  const sort = (a, b) => {
    if(a.count < b.count) return 1
    else if(a.count > b.count) return -1
    else return 0
  }

  const getTopTwentyWords = () => {
    let topTwenty = [];
    let allWords = []
    let wordCounts = {}

    // TODO: move this to its own file
    const stopwords = ["with", "to", "of", "the", "there", "are", "more", "this", "on", "its", "in", "and", "for", "gt", "will", "or", "an", "be", "how", "is", "from", "https", "rt", "co", "by", "our", "via", "at", "can"]

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
    return topTwenty;
  }

  useEffect(() => {
    // getTopTwentyWords()
    if(twitterData.length > 0) console.log(getTopTwentyWords())
  })


  const frameProps = {
    data: [
      {
        word: "Augmented Reality",
        count: 50,
        color: '#00D1FF'
      },
      {
        word: "Virtual Reality",
        count: 43,
        color: '#52E0FF'
      },
      {
        word: "Wearable Tech",
        count: 27,
        color: '#89EAFF'
      },
      {
        word: "Technology",
        count: 12,
        color: '#BEF3FF'
      },
      {
        word: "AR",
        count: 3,
        color: '#FFFFFF'
      }
    ],
    size: [400, 400],
    margin: 50,
    type: { type: "bar", innerRadius: 200 },
    projection: "radial",
    dynamicColumnWidth: "count",
    oAccessor: "word",
    // style: { fill: "#00D1FF", stroke: "#0A111C"},
    style: d=> ({ fill: d.color }),
    oPadding: 10,
    // pieceHoverAnnotation: true,
    // hoverAnnotation: true,
    // oLabel: d => <text fontSize={16} dx={-15} dy={-20}>{d}</text>,
    // oLabel: { label: true, orient: "stem", padding: -5 }
    annotations: [
      {
        dx: 70,
        dy: 50,
        x: 350,
        color: "#FFFFFF",
        type: AnnotationCalloutElbow,
        word: "Augmented Reality",
        count: 50,
        note: { title: "Augmented Reality" }
      },
      {
        dx: 70,
        dy: 50,
        x: 350,
        color: "#FFFFFF",
        type: AnnotationCalloutElbow,
        word: "Virtual Reality",
        count: 43,
        note: { title: "Virtual Reality" }
      }
    ],
    // annotationSettings: {
    //   layout: {
    //     type: "marginalia",
    //     orient: "nearest",
    //     characterWidth: 8,
    //     lineWidth: 20,
    //     padding: 2,
    //     iterations: 1000,
    //     pointSizeFunction: () => 2
    //   }
    // }
  }

  return (<OrdinalFrame {...frameProps} />)
})

export default Chart;